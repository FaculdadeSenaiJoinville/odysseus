import { UpsertHistoryDTO } from 'src/modules/chatbot/history/dto/create-history.dto';
import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

@Entity('bot_histories')
export class BotHistory {

	@PrimaryGeneratedColumn('uuid')
	@Index()
	public id: string;

	@Column()
	public user_name?: string;

	@Column()
	public user_message?: string;

	@Column()
	public bot_response?: string;
	
	@Column()
	public chat_id?: number;

	@CreateDateColumn()
	public created_at: Date;

	constructor(body?: UpsertHistoryDTO, id?: string) {

		if (id) {

			this.id = id;
		}

		if (body) {

			const { user_name, user_message, chat_id, bot_response } = body;
	
			this.user_name = user_name;
			this.user_message = user_message;
			this.chat_id = chat_id;
			this.bot_response = bot_response;
		}
	}
}
