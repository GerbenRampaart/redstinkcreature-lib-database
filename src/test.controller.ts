import { Controller, Get } from '@nestjs/common';
import { AppLoggerService } from '@redstinkcreature/lib-utilities';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Controller()
export class TestController {
	constructor(
		private readonly l: AppLoggerService,
		@InjectDataSource()
		private readonly ds: DataSource
	) {
	}

	@Get()
	test() {
		
		this.l.info('test route');
		return 'test';
	}
}
