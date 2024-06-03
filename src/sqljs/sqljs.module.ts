import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../user.entity.ts';
import { join } from 'std/path';
import sqljs from 'sql.js';
import { exists } from 'std/fs';
import { AppLoggerService } from '@redstinkcreature/lib-utilities';

export const ConnectionName = 'SQLJS';

@Module({
	imports: [
		TypeOrmModule.forRootAsync(
			{
				name: ConnectionName,
				useFactory: async (
					l: AppLoggerService,
				): Promise<TypeOrmModuleOptions> => {
					const dir = join(Deno.cwd(), 'data');
					const dataDirExists = await exists(dir, { 
						isDirectory: true,
						isReadable: true
					});
					
					if (!dataDirExists) {
						await Deno.mkdir(dir);
						l.debug(`Created ${dir}`);
					}

					const path = join(dir, 'dev.db');

					l.info(`SqlJs path: ${path}`);

					const opts: TypeOrmModuleOptions = {
						type: 'sqljs',
						// Since every SqlJs database is a throw-away database, synchronize always.
						synchronize: true,
						manualInitialization: true,
						entities: [
							User
						],
						autoSave: true,
						autoSaveCallback: async (data: Uint8Array) => {
							l.debug(`${data.length} bytes to ${path}`);
							await Deno.writeFile(path, data);
						},
						driver: sqljs
						//logger: {
						//}
						
						
						
					};

					return opts;
				},
				inject: [
					AppLoggerService
				],
			},
		),
		// This makes sure the repositories are created.
		TypeOrmModule.forFeature([User], ConnectionName)
	],
	exports: [
		TypeOrmModule
	]
})
export class SqlJsModule implements OnModuleInit, OnModuleDestroy {
	constructor(
		private readonly l: AppLoggerService,
		@InjectDataSource(ConnectionName) private readonly ds: DataSource,
	) {
	}

	async onModuleInit() {
		if (!this.ds.isInitialized) {
			this.l.warn(`Initializing DB connection ${ConnectionName}`);
			try {
				await this.ds.initialize();
			} catch (err) {
				this.l.error(`COULD NOT CONNECT TO ${ConnectionName}`);
				this.l.error(err);
			}
		}
	}

	async onModuleDestroy() {
		if (this.ds.isInitialized) {
			this.l.warn(`Destroying DB connection ${ConnectionName}`);
			await this.ds.destroy();
		}
	}
}
