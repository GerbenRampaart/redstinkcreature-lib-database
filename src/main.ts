import { AppLoggerService } from '@redstinkcreature/lib-utilities';
import { DatabaseModule } from './database.module.ts';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

// @deno-types=npm:@types/express@4
import express from 'express';

const server = express();

// This casting is necessary because of the following error:
// Argument of type 'ExpressAdapter' is not assignable to parameter of type 'AbstractHttpAdapter<any, any, any>'.
const adapter = new ExpressAdapter(server) as unknown as AbstractHttpAdapter<
	any,
	any,
	any
>;

async function bootstrap() {
	const app = await NestFactory.create(
		DatabaseModule,
		adapter,
		{
			abortOnError: true,
			bufferLogs: true,
		},
	);

	const l = app.get(AppLoggerService);
	app.useLogger(l);

	await app.listen(3000);
}

await bootstrap();
