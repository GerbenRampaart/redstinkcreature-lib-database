import {
	Module,
} from '@nestjs/common';
import { AppConfigModule, AppConfigService, AppConstantsService, AppLoggerModule, AppLoggerService } from '@redstinkcreature/lib-utilities';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseEnvSchemaType, databaseEnvSchema } from '../database.schema.ts';
import { User } from '../user.entity.ts';

@Module({
	imports: [
		AppLoggerModule,
		TypeOrmModule.forRootAsync(
			{

				useFactory: async (
					l: AppLoggerService,
					c: AppConfigService<DatabaseEnvSchemaType>): Promise<TypeOrmModuleOptions> => {
					const p = await AppConstantsService.product();

					const opts: TypeOrmModuleOptions = {
						applicationName: `${p.name}:${p.version}`,
						name: 'POSTGRES',
						type: 'postgres',
						url: c.get('POSTGRES_URL'),
						synchronize: false,

						//logger: {
						//}

					}

					return opts;
				},
				imports: [
					AppLoggerModule,
					AppConfigModule.registerAsync<DatabaseEnvSchemaType>({
						schema: databaseEnvSchema
					}),
				],
				inject: [
					AppLoggerService,
					AppConfigService
				],
				

			}),
			TypeOrmModule.forFeature([User], 'POSTGRES')
	],
	exports: [

	]
})
export class PostgresModule {

}
