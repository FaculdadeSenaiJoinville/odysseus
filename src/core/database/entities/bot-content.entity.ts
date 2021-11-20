import { UpsertContentDTO } from 'src/modules/chatbot/content/dto/create-content.dto';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BotIntent, CoreEntity } from '.';

@Entity('bot_contents')
export class BotContent extends CoreEntity {

	@Column()
	public explanation?: string;

	@Column()
	public link?: string;

	@ManyToMany(() => BotIntent, (intent: BotIntent) => intent.contents)
	@JoinTable({
		name: 'bot_intent_contents',
		joinColumn: {
			name: 'content_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'bot_intents',
			referencedColumnName: 'id'
		}
	})
	public intents?: BotIntent[];

	constructor(body?: UpsertContentDTO, id?: string) {

		super();

		if (id) {

			this.id = id;
		}

		if (body) {

			const { name, explanation, link } = body;
	
			this.name = name;
			this.explanation = explanation || '';
			this.link = link || ''
		}
	}
}
