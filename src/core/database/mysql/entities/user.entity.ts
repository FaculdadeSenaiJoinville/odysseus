import { MySqlCoreEntity } from 'src/core/database';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends MySqlCoreEntity {

	@Column({ length: 100 })
	email: string;

	@Column()
	password: string;

	@Column()
	active: boolean;

}
