import { MongoCoreEntity } from 'src/core/database';
import { Entity, Column, Index } from 'typeorm';

@Entity('tokens')
export class Token extends MongoCoreEntity {

	@Column()
	token: string;

	@Column()
	@Index()
	user_id: string;

	constructor(token: string, user_id: string) {

		super();

		this.token = token;
		this.user_id = user_id;
	}

}
