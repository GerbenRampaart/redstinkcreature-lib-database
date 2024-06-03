import { AppConstantsService, Module } from '@redstinkcreature/lib-utilities';
import {
	AppConfigService,
	AppLoggerService,
	LibUtilitiesModule,
} from '@redstinkcreature/lib-utilities';
import { TestController } from './test.controller.ts';
import { databaseEnvSchema } from './database.schema.ts';
import { PostgresModule } from './postgres/postgres.module.ts';
import { UsersService } from './users.service.ts';
import { SqlJsModule } from './sqljs/sqljs.module.ts';

@Module({
	imports: [
		LibUtilitiesModule.register({
			config: {
				schema: databaseEnvSchema,
				useDotEnvDefaults: AppConstantsService.env.isDebug,
				useDotEnvEnvironment: AppConstantsService.env.isDebug,
			},
		}),
		PostgresModule,
		SqlJsModule
	],
	providers: [
		AppConfigService,
		AppLoggerService,
		UsersService
	],
	controllers: [
		TestController,
	],
})
export class DatabaseModule {

}
