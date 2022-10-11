import { Entity, Column, JoinTable, ManyToMany, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity, Group, User } from '.';
import { TrailsType } from '../../../modules/trail/utils/trails.type';
import { AvailableTrail } from './available-trail.entity';

@Entity('trails')
export class Trail extends CoreEntity {

	@Column({ length: 400 })
	public description: string;

	@Column()
	public status: TrailsType;

	@Column({length: 100})
	public icon: string;

	@Column()
	public color: string;

	@Column()
	public active: boolean;


	@ManyToMany(() => Group, (group: Group) => group.trails)
	@JoinTable({
		name: 'available_trails',
		joinColumn: {
			name: 'trails_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'entity_id',
			referencedColumnName: 'id'
		}
	})
	public groups? : Group[];

	@ManyToMany(() => User, (user: User) => user.trails)
	@JoinTable({
		name: 'available_trails',
		joinColumn: {
			name: 'trails_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'entity_id',
			referencedColumnName: 'id'
		}
	})
	public users? : User[];
	
	addUserAccess(user: User) {

		if (!this.users) {

			this.users = new Array<User>();
		}

		this.users.push(user);
	}

}
