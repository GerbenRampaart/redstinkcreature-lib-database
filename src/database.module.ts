import {
DynamicModule,
	Module,
} from '@nestjs/common';
import { AppConfigModule, AppConfigService, AppLoggerModule, AppLoggerService, LibUtilitiesModule } from '@redstinkcreature/lib-utilities';
import { TestController } from './test.controller.ts';

@Module({
	imports: [
		AppLoggerModule,
	],
})
export class DatabaseModule {
	public async registerAsync(): Promise<DynamicModule> {
		return {
			module: LibUtilitiesModule,
			imports: [
				AppConfigModule.registerAsync(options?.config),
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
