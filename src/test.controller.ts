import { Controller, Get } from '@redstinkcreature/lib-utilities';
import { AppLoggerService } from '@redstinkcreature/lib-utilities';
import { User } from './user.entity.ts';
import { UsersService } from './users.service.ts';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller()
export class TestController {
	constructor(
		private readonly l: AppLoggerService,

		private readonly user: UsersService,


	) {
	}

	@Get()
	async test() {

		
		const u: User = {
			firstName: 'firstname' + crypto.randomUUID(),
			lastName: 'firstname' + crypto.randomUUID(),
			id: crypto.randomUUID(),
			isActive: true
		}
		const result = await this.user.insert(u);
		return {
			result,
			current: await this.user.findAll()
		};
	}
}
