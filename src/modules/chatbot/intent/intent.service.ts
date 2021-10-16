import { Injectable } from '@nestjs/common';
import { BotIntent } from '../../../core/database/entities';
import { MySQLRepositoryService } from '../../../core/repository';
import { DialogflowService } from '../dialogflow/dialogflow.service';
import { Intent } from '../dialogflow/utils/dialogflow.types';
import { CreateIntentDTO } from './dto/create-intent.dto';

@Injectable()
export class BotIntentService {

	constructor(
		private readonly dialogflowService: DialogflowService,
		private readonly mysqlRepository: MySQLRepositoryService
	) {}

	public async listIntents() {
		
		return this.mysqlRepository.get(BotIntent).createQueryBuilder('bot_intents').getManyAndCount();
	}

	public async createIntent(body: CreateIntentDTO): Promise<BotIntent> {

		const intent = new Intent(body);
		const createdIntent = await this.dialogflowService.createIntent(intent);
		const botIntent = new BotIntent(createdIntent);

		return this.mysqlRepository.save(BotIntent, botIntent);
	}

}
