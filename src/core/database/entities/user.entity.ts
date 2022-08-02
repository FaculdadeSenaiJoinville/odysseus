import { Entity, Column, Index, JoinTable, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { BotIntent, CoreEntity, Group, Trail } from '.';
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

	@ManyToMany(() => Trail, (trail: Trail) => trail.users)
	@JoinTable({
		name: 'available_trails',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'trail_id',
			referencedColumnName: 'id'
		}
	})
	public trails?: Trail[];

	addTrails(trail: Trail) {

		if (!this.trails) {

			this.trails = new Array<Trail>();
		}

		this.trails.push(trail);
	}

	addGroup(group: Group) {

		if (!this.groups) {

			this.groups = new Array<Group>();
		}

		this.groups.push(group);
	}

}
