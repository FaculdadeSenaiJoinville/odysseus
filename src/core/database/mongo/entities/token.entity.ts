import { Entity, Column, Index, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('tokens')
export class Token {

	@ObjectIdColumn()
	@Index()
	public _id: ObjectID;

	@Column()
	public token: string;

	@Column()
	@Index()
	public user_id: string;

	constructor(token: string, user_id: string) {

		this.token = token;
		this.user_id = user_id;
	}

}
