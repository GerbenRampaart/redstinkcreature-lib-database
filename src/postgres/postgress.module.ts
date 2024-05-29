import {
    Module,
} from '@nestjs/common';
import { AppConfigModule, AppConfigService, AppConstantsService, AppLoggerModule, AppLoggerService } from '@redstinkcreature/lib-utilities';
import { TypeOrmModule, TypeOrmModuleOptions  } from '@nestjs/typeorm';
import { DatabaseEnvSchemaType } from '../database.schema.ts';
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
						type: 'postgres',
						url: c.get('POSTGRESS_URL'),
						synchronize: false,
                        //logger: {
                        //}
                        entities: [
                            User
                        ]
					}

					return opts;
				},
				imports: [
					AppLoggerModule,
					AppConfigModule
				],
				inject: [
					AppLoggerService,
					AppConfigService
				]
		})  
	],
})
export class PostgresModule {

}
