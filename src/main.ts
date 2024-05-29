import { AppLoggerService } from '@redstinkcreature/lib-utilities';
import { NestFactory } from '@nestjs/core';
import { PostgresModule } from './postgres/postgress.module.ts';

async function bootstrap() {
	const app = await NestFactory.create(
		PostgresModule
	);

	const l = app.get(AppLoggerService);
	app.useLogger(l);

	await app.listen(3000);
}

await bootstrap();
