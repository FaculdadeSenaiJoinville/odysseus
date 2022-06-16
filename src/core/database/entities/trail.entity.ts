import { Entity, Column } from 'typeorm';
import { CoreEntity } from '.';
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

}
