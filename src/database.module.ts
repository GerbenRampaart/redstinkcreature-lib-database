import {
	Module,
	OnApplicationBootstrap,
	OnApplicationShutdown,
	type OnModuleInit,
} from '@nestjs/common';
import {  } from '@redstinkcreature/lib-utilities';

@Module({
	imports: [
		AppLoggerModule,
	],
})
export class LibUtilitiesModule
	implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {
	public static register(
		options?: LibUtilitiesOptions,
	) {
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

	constructor(
		private readonly l: AppLoggerService,
	) {
	}

	onApplicationShutdown(signal?: string | undefined) {
		this.l.info(`APPLICATION SHUTDOWN (signal ${signal})`);
	}

	onApplicationBootstrap() {
		this.l.info(`APPLICATION BOOTSTRAP`);
	}

	async onModuleInit() {
		const p = await AppConstantsService.product();
		this.l.info(
			`Loaded app: ${p.name}:${p.version}`,
		);

		AppConstantsService.paths.forEach((v) => {
			this.l.info(`${v.n}: ${v.p}`);
		});
	}
}
