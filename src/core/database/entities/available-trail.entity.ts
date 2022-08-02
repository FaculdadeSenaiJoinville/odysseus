import { AddedBy } from 'src/modules/trail/utils/added-by.type';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, Column, ManyToMany } from 'typeorm';
import { Trail, User } from '.';

@Entity('available_trails')
export class AvailableTrail {

	@PrimaryColumn()
	public trail_id: string;

	@PrimaryColumn()
	public user_id: string;

  @Column()
	public added_by: AddedBy;
	
  @CreateDateColumn()
  public released_at: Date;


	@ManyToOne(() => Trail, (trail: Trail) => trail.users, { primary: true })
	@JoinColumn({ name: 'trail_id' })
	public trail: Promise<Trail>;

	@ManyToOne(() => User, (user: User) => user.trails, { primary: true })
	@JoinColumn({ name: 'user_id' })
	public user: Promise<User>;

	constructor(trail_id?: string, user_id?: string) {

		this.trail_id = trail_id;
		this.user_id = user_id;
	}

}
