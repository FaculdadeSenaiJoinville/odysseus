import { MySqlCoreEntity } from 'src/core/database';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { User } from '.';

@Entity('groups')
export class Group extends MySqlCoreEntity {

	@Column()
	public description?: string;

	@ManyToMany(() => User, (user: User) => user.groups)
	@JoinTable({
		name: 'groups_members',
		joinColumn: {
			name: 'group_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		}
	})
	public users?: User[];

	addUser(user: User) {

		if (!this.users) {

			this.users = new Array<User>();
		}

		this.users.push(user);
	}

	constructor(name: string, description: string) {

		super();

		this.name = name;
		this.description = description;
	}

}
