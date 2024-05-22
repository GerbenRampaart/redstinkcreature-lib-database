import {
DynamicModule,
	Module,
} from '@nestjs/common';
import { AppConfigModule, AppConfigService, AppLoggerModule, AppLoggerService, LibUtilitiesModule } from '@redstinkcreature/lib-utilities';
import { TestController } from './test.controller.ts';
import z from 'zod';

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
				AppConfigModule.registerAsync({
					schema: z.object({
						POSTGRESS_URL: z.string().optional(),
						MONGO_URL: z.string().optional(),
						SQLITE_URL: z.string().optional(),
					})
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
