import { UpsertBotUserDTO } from 'src/modules/chatbot/user/dto/create-bot-user.dto';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('bot_users')
export class BotUser {

	@PrimaryGeneratedColumn('uuid')
	@Index()
	public id: string;

	@Column()
	public name?: string;

	@Column()
	public email?: string;

	@Column()
	public chat_id?: number;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;

	@BeforeUpdate()
	protected setUpdatedProperties() {

		this.updated_at = new Date();
	}

	constructor(body?: UpsertBotUserDTO, id?: string) {

		if (id) {

			this.id = id;
		}

		if (body) {

			const { name, chat_id, email } = body;
	
			this.email = email;
			this.name = name;
			this.chat_id = chat_id;
		}
	}
}
