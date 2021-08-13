import { MySqlCoreEntity } from 'src/core/database';
import { Entity, Column, Index } from 'typeorm';
import { UserType } from 'src/modules/user/others/users.type';

@Entity('users')
export class User extends MySqlCoreEntity {

	@Column({ length: 100 })
	@Index()
	public email: string;

	@Column({ select: false })
	public password: string;

	@Column()
	public active: boolean;

	@Column()
	public type: UserType;

}
