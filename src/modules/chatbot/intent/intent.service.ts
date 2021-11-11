import { Injectable } from '@nestjs/common';
import { BaseMessage, SuccessSaveMessage } from '../../../common/types';
import { BotContent, BotIntent } from '../../../core/database/entities';
import { MySQLRepositoryService } from '../../../core/repository';
import { DialogflowService } from '../dialogflow/dialogflow.service';
import { Intent, IntentMessage } from '../dialogflow/utils/dialogflow.types';
import { UpsertIntentDTO } from './dto/create-intent.dto';

@Injectable()
export class BotIntentService {

	constructor(
		private readonly dialogflowService: DialogflowService,
		private readonly mysqlRepository: MySQLRepositoryService
	) {}

	public async create(body: UpsertIntentDTO): Promise<SuccessSaveMessage> {

		const messages = await this.getMessages(body);
		const intent = new Intent(body, messages);
		const createdIntent = await this.dialogflowService.createIntent(intent);
		const botIntent = new BotIntent(createdIntent);
		const savedIntent = await this.mysqlRepository.save(BotIntent, botIntent);

		return {
			id: savedIntent.id,
			message: 'Intent criada com sucesso!'
		};
	}

	public async update(id: string, body: UpsertIntentDTO): Promise<SuccessSaveMessage> {

		const databaseIntent = await this.mysqlRepository.findOne(BotIntent, id);
		const messages = await this.getMessages(body);
		const intent = new Intent(body, messages);
		const updatedIntent = await this.dialogflowService.updateIntent(databaseIntent.dialogflow_id, intent);
		const botIntent = new BotIntent(updatedIntent, id);
		const savedIntent = await this.mysqlRepository.save(BotIntent, botIntent);

		return {
			id: savedIntent.id,
			message: 'Intent atualizada com sucesso!'
		};
	}

	public async remove(id: string): Promise<BaseMessage> {

		const intent = await this.mysqlRepository.findOne(BotIntent, id);

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

			for (const id of contents) {

				const { explanation, link } = await this.mysqlRepository.findOne(BotContent, id);

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
