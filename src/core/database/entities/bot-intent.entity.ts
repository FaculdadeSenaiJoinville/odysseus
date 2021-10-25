import { Entity, Column } from 'typeorm';
import { CoreEntity } from '.';
import { DIALOGFLOW_CREDENTIALS } from '../../../modules/chatbot/dialogflow/utils/dialogflow.config';
import { Intent } from '../../../modules/chatbot/dialogflow/utils/dialogflow.types';

@Entity('bot_intents')
export class BotIntent extends CoreEntity {

	@Column()
	public dialogflow_id: string;

	@Column('json')
	public training_phrases: string[];

	@Column()
	public priority: number;

	@Column()
	public end_interaction: boolean;

	constructor(body?: Intent, id?: string) {

		super();

		if (id) {

			this.id = id;
		}

		if (body) {

			const { name, displayName, trainingPhrases, priority, endInteraction } = body;
			const dialogflowId = name.replace(`projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents/`, '');
	
			this.dialogflow_id = dialogflowId;
			this.name = displayName;
			this.training_phrases = trainingPhrases.map(trainingPhrase => {
	
				return trainingPhrase.parts[0].text;
			});
			this.priority = priority;
			this.end_interaction = endInteraction;
		}
	}
}
