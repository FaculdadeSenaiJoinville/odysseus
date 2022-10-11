import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { CoreEntity, Trail, User } from '.';

@Entity('groups')
export class Group extends CoreEntity {

	@Column()
	public description?: string;



	@ManyToMany(() => Trail, (trail: Trail) => trail.groups)
	@JoinTable({
		name: 'available_trails',
		joinColumn: {
			name: 'entity_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'trails_id',
			referencedColumnName: 'id'
		}
	})
	public trails?: Trail[];



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
