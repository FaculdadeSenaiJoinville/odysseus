import { MySqlCoreEntity } from 'src/modules/entities';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends MySqlCoreEntity {

	@Column({ length: 100 })
	email: string;

	@Column({ length: 255 })
	password: string;

	@Column()
	active: boolean;

}
