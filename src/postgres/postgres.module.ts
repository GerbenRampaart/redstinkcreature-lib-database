import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, InjectDataSource } from '@nestjs/typeorm';
import { AppConfigService, AppConstantsService, AppLoggerService } from '@redstinkcreature/lib-utilities';
import {
	DatabaseEnvSchemaType,
} from '../database.schema.ts';
import { DataSource } from 'typeorm';
import pg from 'pg';
import { User } from '../user.entity.ts';

export const ConnectionName = 'POSTGRES';

@Module({
	imports: [
		//LibUtilitiesModule,
		TypeOrmModule.forRootAsync(
			{
				name: ConnectionName,
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
						synchronize: AppConstantsService.env.isDebug,
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
		TypeOrmModule.forFeature([User], ConnectionName)
	],
	exports: [
		TypeOrmModule
	]
})
export class PostgresModule implements OnModuleInit, OnModuleDestroy {
	constructor(
		private readonly l: AppLoggerService,
		@InjectDataSource(ConnectionName) private readonly ds: DataSource,
	) {
	}

	async onModuleInit() {
		if (!this.ds.isInitialized) {
			this.l.warn(`Initializing DB connection ${ConnectionName}`);
			
			try {
				await this.ds.initialize();
			} catch (err) {
				this.l.error(`COULD NOT CONNECT TO ${ConnectionName}`);
				this.l.error(err);
			}
			
		}
	}

	async onModuleDestroy() {
		if (this.ds.isInitialized) {
			this.l.warn(`Destroying DB connection ${ConnectionName}`);
			await this.ds.destroy();
		}
	}
}
