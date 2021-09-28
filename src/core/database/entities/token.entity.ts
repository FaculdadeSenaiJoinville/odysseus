import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class Token {

	@PrimaryGeneratedColumn('uuid')
	@Index()
	public id: string;

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
