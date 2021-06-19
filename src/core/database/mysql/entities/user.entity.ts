import { MySqlCoreEntity } from 'src/core/database';
import { Entity, Column, Index } from 'typeorm';

@Entity('users')
export class User extends MySqlCoreEntity {

	@Column({ length: 100 })
	@Index()
	public email: string;

	@Column()
	public password: string;

	@Column()
	public active: boolean;

}
