import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('tokens')
export class Token {

	@ObjectIdColumn()
	_id: ObjectID;

	@Column()
	token: string;

	@Column()
	user_id: number;

	constructor(token: string, user_id: number) {

		this.token = token;
		this.user_id = user_id;
	}

}
