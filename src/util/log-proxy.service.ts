import { Injectable } from '@nestjs/common';
import { AppLoggerService } from '@redstinkcreature/lib-utilities';
import { Logger, QueryRunner } from 'typeorm';

@Injectable()
export class LogProxyService implements Logger {
	constructor(
		private readonly l: AppLoggerService,
	) {
	}

	logQuery(
		query: string,
		parameters?: unknown[] | undefined,
		_queryRunner?: QueryRunner | undefined,
	) {
		this.l.debug({
			msg: 'TYPEORM: QUERY',
			query,
			parameters,
		});
	}

	logQueryError(
		error: string | Error,
		query: string,
		parameters?: unknown[] | undefined,
		_queryRunner?: QueryRunner | undefined,
	) {
		this.l.error({
			msg: 'TYPEORM: ERROR',
			error,
			query,
			parameters,
		});
	}

	logQuerySlow(
		time: number,
		query: string,
		parameters?: unknown[] | undefined,
		_queryRunner?: QueryRunner | undefined,
	) {
		this.l.warn({
			msg: 'TYPEORM: SLOW QUERY',
			time,
			query,
			parameters,
		});
	}

	logSchemaBuild(message: string, _queryRunner?: QueryRunner | undefined) {
		this.l.info({
			msg: 'TYPEORM: SCHEMA BUILD',
			message,
		});
	}

	logMigration(message: string, _queryRunner?: QueryRunner | undefined) {
		this.l.warn({
			msg: 'TYPEORM: MIGRATION',
			message,
		});
	}

	log(
		level: 'log' | 'warn' | 'info',
		message: unknown,
		_queryRunner?: QueryRunner | undefined,
	) {
		this.l[level]({
			msg: 'TYPEORM: GENERIC',
			message,
		});
	}
}
