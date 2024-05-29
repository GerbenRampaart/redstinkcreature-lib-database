import {
DynamicModule,
	Module,
} from '@nestjs/common';
import { AppConfigModule, AppConfigService, AppLoggerModule, AppLoggerService, LibUtilitiesModule } from '@redstinkcreature/lib-utilities';
import { TestController } from './test.controller.ts';
import { DatabaseModuleOptions } from './database-module.options.ts';
import { DatabaseEnvSchemaType, databaseEnvSchema } from './database.schema.ts';
import { PostgresModule } from './postgres/postgres.module.ts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.ts';

@Module({
	imports: [
		AppConfigModule.registerAsync<DatabaseEnvSchemaType>({
			schema: databaseEnvSchema
		}),
		PostgresModule,
		AppLoggerModule,
	],
	providers: [
		AppConfigService,
		AppLoggerService,
		
	],
	controllers: [
		TestController,
	],
	exports: [
		PostgresModule
	]
})
export class DatabaseModule {
}
