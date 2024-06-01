import { Injectable } from '@redstinkcreature/lib-utilities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.ts';
import { PostgresConnectionName } from './postgres/postgres.module.ts';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User, PostgresConnectionName) private ur: Repository<User>,
	) {}

	findAll(): Promise<User[]> {
		return this.ur.find();
	}

	findOne(id: string): Promise<User | null> {
		return this.ur.findOneBy({ id });
	}

	async remove(id: number): Promise<void> {
		await this.ur.delete(id);
	}

	async insert(user: User): Promise<void> {
		await this.ur.insert(user);
	}
}
