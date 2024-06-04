import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
	name: 'users',
})
export class User {
	@PrimaryColumn()
	id!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ default: true })
	isActive!: boolean;
}
