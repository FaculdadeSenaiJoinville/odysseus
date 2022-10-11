import { session } from 'src/core/session';
import { TrailType } from 'src/modules/trail/utils/trailsAccessType';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, Column, ManyToMany, BeforeInsert, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Group, Trail, User } from '.';

@Entity('available_trails')
export class AvailableTrail {

	@PrimaryGeneratedColumn('uuid')
	@Column()
	public id?: string;

	@PrimaryColumn()
	public trails_id: string;
	
  @PrimaryColumn()
	public entity_id: string;

	//type => User, user=> user.photo,
	@ManyToOne(() => Trail, trail => trail.users || trail.groups)
	@JoinColumn({ name: 'trails_id' })
	public trails: Promise<Trail>;
	
	@ManyToOne(() => User, user => user.trails)
	@JoinColumn({ name: 'entity_id' })
	public users: Promise<User>;
	
	@ManyToOne(() => Group, group => group.trails)
	@JoinColumn({ name: 'entity_id' })
	public groups: Promise<Group>;

  @Column()
	public type: TrailType;
	
	@Column()
	public created_by?: string;

	@BeforeInsert()
	protected setInsertProperties() {

		this.created_by = session.getUser()?.id;
	}

	constructor(trails_id?: string, entity_id?: string) {

		this.trails_id = trails_id;
		this.entity_id = entity_id;
	}

}
