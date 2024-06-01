import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users'
})
export class User {
	@PrimaryGeneratedColumn()
	id!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ default: true })
	isActive!: boolean;
}
