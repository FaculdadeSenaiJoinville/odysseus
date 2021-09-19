import { Entity, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { Group, User } from '.';

@Entity('groups_members')
export class GroupMember {

	@PrimaryColumn()
	public group_id: string;

	@PrimaryColumn()
	public user_id: string;

	@CreateDateColumn()
	public added_at: Date;
	
	@ManyToOne(() => Group, (group: Group) => group.users, { primary: true })
	@JoinColumn({ name: 'group_id' })
	public group?: Promise<Group>;

	@ManyToOne(() => User, (user: User) => user.groups, { primary: true })
	@JoinColumn({ name: 'user_id' })
	public user?: Promise<User>;

}
