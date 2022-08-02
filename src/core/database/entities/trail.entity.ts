import { Entity, Column, JoinTable, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { CoreEntity, User } from '.';
import { TrailsType } from '../../../modules/trail/utils/trails.type';

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


	@ManyToMany(() => User, (user: User) => user.trails)
	@JoinTable({
		name: 'available_trails',
		joinColumn: {
			name: 'trail_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'user_id',
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
