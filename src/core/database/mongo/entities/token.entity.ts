import { MongoCoreEntity } from 'src/modules/entities';
import { Entity, Column } from 'typeorm';

@Entity('tokens')
export class Token extends MongoCoreEntity {

	@Column()
	token: string;

	@Column()
	user_id: number;

	constructor(token: string, user_id: number) {

		super();

		this.token = token;
		this.user_id = user_id;
	}

}
