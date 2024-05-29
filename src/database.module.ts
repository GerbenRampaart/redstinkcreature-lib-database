import {
DynamicModule,
	Module,
} from '@nestjs/common';
import { AppConfigModule, AppConfigService, AppLoggerModule, AppLoggerService, LibUtilitiesModule } from '@redstinkcreature/lib-utilities';
import { TestController } from './test.controller.ts';
import { DatabaseModuleOptions } from './database-module.options.ts';
import { DatabaseEnvSchemaType, databaseEnvSchema } from './database.schema.ts';

@Module({

})
export class DatabaseModule {
	public static async registerAsync(
		options: DatabaseModuleOptions
	): Promise<DynamicModule> {
		return {
			module: LibUtilitiesModule,
			imports: [
				AppConfigModule.registerAsync<DatabaseEnvSchemaType>({
					schema: databaseEnvSchema
				}),
				
				AppLoggerModule,
			],
			providers: [
				AppConfigService,
				AppLoggerService,
				
			],
			exports: [
				AppConfigService,
				AppLoggerService,
			],
			controllers: [
				TestController,
			],
		};
	}
}
