import { session } from 'src/core/session';
import { Type } from 'src/modules/trail/utils/trailAccessType';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, Column, ManyToMany, BeforeInsert, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Trail, User } from '.';

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
	@ManyToOne(() => Trail, trail => trail.availableTrail)
	@JoinColumn({ name: 'trails_id' })
	public trails: Promise<Trail>;

  @Column()
	public type: Type;
	
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
