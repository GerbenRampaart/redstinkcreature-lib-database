import { Module } from '@redstinkcreature/lib-utilities';
import {
	AppConfigService,
	AppLoggerService,
	LibUtilitiesModule,
} from '@redstinkcreature/lib-utilities';
import { TestController } from './test.controller.ts';
import { databaseEnvSchema } from './database.schema.ts';
import { PostgresModule } from './postgres/postgres.module.ts';
import { UsersService } from './users.service.ts';

@Module({
	imports: [
		PostgresModule,
		LibUtilitiesModule.register({
			config: {
				schema: databaseEnvSchema,
				useDotEnvDefaults: true,
				useDotEnvEnvironment: true,
			},
		})
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
