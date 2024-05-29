import { Controller, Get } from '@nestjs/common';
import { AppLoggerService } from '@redstinkcreature/lib-utilities';
import { DataSource } from 'typeorm';

@Controller()
export class TestController {
	constructor(
		private readonly l: AppLoggerService,
		private readonly ds: DataSource
	) {
	}

	@Get()
	test() {
		this.ds.query()
		this.l.info('test route');
		return 'test';
	}
}
