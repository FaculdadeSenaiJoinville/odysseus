import { Injectable } from '@nestjs/common';
import { BaseMessage, SuccessSaveMessage } from '../../../common/types';
import { BotContent, BotIntent, BotIntentContents } from '../../../core/database/entities';
import { MySQLRepositoryService } from '../../../core/repository';
import { DialogflowService } from '../dialogflow/dialogflow.service';
import { Intent, IntentMessage } from '../dialogflow/utils/dialogflow.types';
import { UpsertIntentDTO } from './dto/upsert-intent.dto';

@Injectable()
export class BotIntentService {

	constructor(
		private readonly dialogflowService: DialogflowService,
		private readonly mysqlRepository: MySQLRepositoryService
	) {}

	public async create(body: UpsertIntentDTO): Promise<SuccessSaveMessage> {

		const contents = body.contents;
		const messages = await this.getMessages(body);
		const intent = new Intent(body, messages);
		const createdIntent = await this.dialogflowService.createIntent(intent);
		const botIntent = new BotIntent(createdIntent, null, body.message);
		const savedIntent = await this.mysqlRepository.save(BotIntent, botIntent);

		if (contents) {

			for (const content of contents) {

				const dbBotContent = await this.mysqlRepository.findOne(BotContent, {
					relations: ['intents'],
					where: { id: content.id }
				});
				const hasContentInIntent = dbBotContent.intents.find(bot_intent => bot_intent.id === savedIntent.id);

				if (dbBotContent && !hasContentInIntent) {

					const data = { content_id: dbBotContent.id, intent_id: savedIntent.id } as BotIntentContents;

					await this.mysqlRepository.save(BotIntentContents, data);
				}
			}
		}

		return {
			id: savedIntent.id,
			message: 'Intent criada com sucesso!'
		};
	}

	public async update(id: string, body: UpsertIntentDTO): Promise<SuccessSaveMessage> {

		const contents = body.contents;
		const contentsToRemove = body.contents_to_remove;
		const databaseIntent = await this.mysqlRepository.findOne(BotIntent, id);
		const messages = await this.getMessages(body);
		const intent = new Intent(body, messages);
		const updatedIntent = await this.dialogflowService.updateIntent(databaseIntent.dialogflow_id, intent);
		const botIntent = new BotIntent(updatedIntent, id, body.message);
		const savedIntent = await this.mysqlRepository.save(BotIntent, botIntent);

		if (contents) {

			for (const content of contents) {

				const dbBotContent = await this.mysqlRepository.findOne(BotContent, {
					relations: ['intents'],
					where: { id: content.id }
				});
				const hasContentInIntent = dbBotContent.intents.find(bot_intent => bot_intent.id === savedIntent.id);

				if (dbBotContent && !hasContentInIntent) {

					const data = { content_id: dbBotContent.id, intent_id: savedIntent.id } as BotIntentContents;

					await this.mysqlRepository.save(BotIntentContents, data);
				}
			}
		}

		if (contentsToRemove) {

			for (const content of contentsToRemove) {

				const dbBotContent = await this.mysqlRepository.findOne(BotContent, {
					relations: ['intents'],
					where: { id: content.id }
				});
				const hasContentInIntent = dbBotContent.intents.find(bot_intent => bot_intent.id === savedIntent.id);

				if (dbBotContent && hasContentInIntent) {

					await this.mysqlRepository.delete(BotIntentContents, { content_id: dbBotContent.id, intent_id: savedIntent.id });
				}
			}
		}

		return {
			id: savedIntent.id,
			message: 'Intent atualizada com sucesso!'
		};
	}

	public async remove(id: string): Promise<BaseMessage> {

		const intent = await this.mysqlRepository.findOne(BotIntent, id);

		await this.mysqlRepository.delete(BotIntentContents, { intent_id: id });
		await this.dialogflowService.deleteIntent(intent.dialogflow_id);
		await this.mysqlRepository.delete(BotIntent, id);

		return {
			message: 'Intent removida com sucesso!'
		};
	}

	private async getMessages({ message, contents }: UpsertIntentDTO): Promise<IntentMessage[]> {

		const messages = [];

		if (message) {

			messages.push({
				text: {
					text: [
						message
					]
				}
			});
		}

		if (contents) {

			for (const content of contents) {

				const { explanation, link } = await this.mysqlRepository.findOne(BotContent, content.id);

				if (explanation) {

					messages.push({
						text: {
							text: [
								explanation
							]
						}
					});
				}

				if (link) {

					messages.push({
						text: {
							text: [
								link
							]
						}
					});
				}
			}
		}

		return messages;
	}

}
