import { Controller, Get } from '@nestjs/common';
import { AppLoggerService } from '@redstinkcreature/lib-utilities';

@Controller()
export class TestController {
	constructor(
		private readonly l: AppLoggerService,
	) {
	}

	@Get()
	test() {
		this.l.info('test route');
		return 'test';
	}
}
