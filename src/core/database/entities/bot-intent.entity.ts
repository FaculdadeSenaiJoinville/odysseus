import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { CoreEntity, User } from '.';
import { DIALOGFLOW_CREDENTIALS } from '../../../modules/chatbot/dialogflow/utils/dialogflow.config';
import { Intent, IntentMessage } from '../../../modules/chatbot/dialogflow/utils/dialogflow.types';
import { BotContent } from './bot-content.entity';

@Entity('bot_intents')
export class BotIntent extends CoreEntity {

	@Column()
	public dialogflow_id: string;

	@Column('json')
	public training_phrases: string[];

	@Column('json')
	public messages: IntentMessage[];

	@Column()
	public message: string;

	@Column()
	public priority: number;

	@Column()
	public end_interaction: boolean;

	@ManyToOne(() => User, user => user.bot_intents)
	@JoinColumn({ name: 'created_by' })
	public creator: User;

	@ManyToMany(() => BotContent, (content: BotContent) => content.intents)
	@JoinTable({
		name: 'bot_intent_contents',
		joinColumn: {
			name: 'intent_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'content_id',
			referencedColumnName: 'id'
		}
	})
	public contents?: BotContent[];

	constructor(body?: Intent, id?: string, message?: string) {

		super();

		if (id) {

			this.id = id;
		}

		if (body) {

			const { name, displayName, trainingPhrases, priority, endInteraction, messages } = body;
			const dialogflowId = name.replace(`projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents/`, '');
	
			this.dialogflow_id = dialogflowId;
			this.name = displayName;
			this.training_phrases = trainingPhrases.map(trainingPhrase => {
	
				return trainingPhrase.parts[0].text;
			});
			this.message = message;
			this.messages = messages;
			this.priority = priority;
			this.end_interaction = endInteraction;
		}
	}
}
