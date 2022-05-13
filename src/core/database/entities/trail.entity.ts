import { Entity, Column, Index, Binary} from 'typeorm';
import { CoreEntity } from '.';

@Entity('trails')
export class Trail extends CoreEntity {

	@Column({ length: 400 })
	public description: string;

	@Column({length: 20})
	public status: string;

	@Column({length: 100})
	public icon: string;

	@Column()
	public color: string;

	@Column()
	public active: boolean;

}
