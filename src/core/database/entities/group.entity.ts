import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { CoreEntity, User } from '.';

@Entity('groups')
export class Group extends CoreEntity {

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
	public members?: User[];

	addUser(user: User) {

		if (!this.members) {

			this.members = new Array<User>();
		}

		this.members.push(user);
	}

	constructor(name?: string, description?: string) {

		super();

		this.name = name;
		this.description = description;
	}

}
