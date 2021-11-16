import { Entity, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { BotIntent } from '.';
import { BotContent } from './bot-content.entity';

@Entity('bot_intent_contents')
export class BotIntentContents {

	@PrimaryColumn()
	public content_id: string;

	@PrimaryColumn()
	public intent_id: string;

	@CreateDateColumn()
	public added_at: Date;
	
	@ManyToOne(() => BotContent, (content: BotContent) => content.intents, { primary: true })
	@JoinColumn({ name: 'content_id' })
	public content: Promise<BotContent>;

	@ManyToOne(() => BotIntent, (intent: BotIntent) => intent.contents, { primary: true })
	@JoinColumn({ name: 'intent_id' })
	public intent: Promise<BotIntent>;

	constructor(content_id?: string, intent_id?: string) {

		this.content_id = content_id;
		this.intent_id = intent_id;
	}

}
