import { MySqlCoreEntity } from 'src/core/database';
import { Entity, Column, Index, JoinTable, ManyToMany } from 'typeorm';
import { UserType } from '../../../../modules/user/utils/users.type';
import { Group } from '.';

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
	public is_new: boolean;

	@Column()
	public type: UserType;

	@ManyToMany(() => Group, (group: Group) => group.users)
	@JoinTable({
		name: 'groups_members',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'group_id',
			referencedColumnName: 'id'
		}
	})
	public groups?: Group[];

	addGroup(group: Group) {

		if (!this.groups) {

			this.groups = new Array<Group>();
		}

		this.groups.push(group);
	}

}
