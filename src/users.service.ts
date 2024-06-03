import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.ts';
//import { ConnectionName } from './postgres/postgres.module.ts';
import { ConnectionName } from './sqljs/sqljs.module.ts';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User, ConnectionName) private ur: Repository<User>,
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
