import z from 'zod';
import { AppConstantsService, AppLoggerService, LibUtilitiesModule } from '@redstinkcreature/lib-utilities';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
	const app = await NestFactory.create(
		LibUtilitiesModule.register({
			config: {
				schema: z.object({
					TEST: z.string().default('bla'),
					HOMMA: z.coerce.number().default(123),
				}),
				useDotEnvDefaults: AppConstantsService.denoEnv.isDebug,
				useDotEnvEnvironment: AppConstantsService.denoEnv.isDebug,
			},
		}),
	);

	const l = app.get(AppLoggerService);
	app.useLogger(l);

	await app.listen(3000);
}

await bootstrap();
