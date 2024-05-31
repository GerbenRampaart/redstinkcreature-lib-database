import { LibUtilitiesModule, Module } from '@redstinkcreature/lib-utilities';
import {
	AppConfigService,
	AppConstantsService,
} from '@redstinkcreature/lib-utilities';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
	DatabaseEnvSchemaType,
} from '../database.schema.ts';
//import { User } from '../user.entity.ts';
import pg from 'pg';

@Module({
	imports: [
		//LibUtilitiesModule,
		TypeOrmModule.forRootAsync(
			{
				useFactory: async (
					//l: AppLoggerService,
					c: AppConfigService<DatabaseEnvSchemaType>,
				): Promise<TypeOrmModuleOptions> => {
					const p = await AppConstantsService.product();

					const opts: TypeOrmModuleOptions = {
						applicationName: `${p.name}:${p.version}`,
						name: 'POSTGRES',
						type: 'postgres',
						url: c.get('POSTGRES_URL'),
						synchronize: false,
						driver: pg,
						manualInitialization: true,
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
		//TypeOrmModule.forFeature([User], 'POSTGRES')
	],
	exports: [],
})
export class PostgresModule {
}
