import { Entity, Column, Index, JoinTable, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { BotIntent, CoreEntity, Group } from '.';
import { UserType } from '../../../modules/user/utils/users.type';

@Entity('users')
export class User extends CoreEntity {

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

	@OneToMany(() => BotIntent, botIntent => botIntent.creator)
	@JoinColumn({ name: 'id' })
	public bot_intents: BotIntent[];

	@ManyToMany(() => Group, (group: Group) => group.members)
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
