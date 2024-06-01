import { AppLoggerService, Module, OnModuleDestroy, OnModuleInit } from '@redstinkcreature/lib-utilities';
import {
	AppConfigService,
	AppConstantsService,
} from '@redstinkcreature/lib-utilities';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
	DatabaseEnvSchemaType,
} from '../database.schema.ts';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
//import { User } from '../user.entity.ts';
import pg from 'pg';
import { User } from '../user.entity.ts';

export const PostgresConnectionName = 'POSTGRES';

@Module({
	imports: [
		//LibUtilitiesModule,
		TypeOrmModule.forRootAsync(
			{
				name: PostgresConnectionName,
				useFactory: async (
					//l: AppLoggerService,
					c: AppConfigService<DatabaseEnvSchemaType>,
				): Promise<TypeOrmModuleOptions> => {
					const p = await AppConstantsService.product();

					const opts: TypeOrmModuleOptions = {
						applicationName: `${p.name}:${p.version}`,
						//name: PostgresConnectionName,
						type: 'postgres',
						url: c.get('POSTGRES_URL'),
						synchronize: AppConstantsService.denoEnv.isDebug,
						driver: pg,
						manualInitialization: true,
						entities: [
							User
						]
						//logger: {
						//}
						
						
						
					};

					return opts;
				},
				inject: [
					//AppLoggerService,
					AppConfigService,
				],
			},
		),
		// This makes sure the repositories are created.
		TypeOrmModule.forFeature([User], PostgresConnectionName)
	],
	exports: [
		TypeOrmModule
	]
})
export class PostgresModule implements OnModuleInit, OnModuleDestroy {
	constructor(
		private readonly l: AppLoggerService,
		@InjectDataSource(PostgresConnectionName) private readonly ds: DataSource,
	) {
	}

	async onModuleInit() {
		if (!this.ds.isInitialized) {
			this.l.warn(`Initializing DB connection ${PostgresConnectionName}`);
			await this.ds.initialize();
		}
	}

	async onModuleDestroy() {
		if (this.ds.isInitialized) {
			this.l.warn(`Destroying DB connection ${PostgresConnectionName}`);
			await this.ds.destroy();
		}
	}
}
