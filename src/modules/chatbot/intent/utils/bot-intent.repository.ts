import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../../common/types';
import { BotIntent } from '../../../../core/database/entities';

@Injectable()
export class BotIntentRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public listIntents(options: ListOptions<BotIntent>): Promise<[BotIntent[], number]> {

		const queryBuilder = this.mysqlRepository.get(BotIntent).createQueryBuilder('bot_intents')
			.select(['bot_intents.id', 'bot_intents.name']);

		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
			.getManyAndCount();
	}

	public async intentDetails(id: string): Promise<BotIntent> {

		return this.mysqlRepository.get(BotIntent).createQueryBuilder('bot_intents')
			.where({ id })
			.select(['bot_intents.id', 'bot_intents.dialogflow_id', 'bot_intents.name', 'bot_intents.training_phrases', 'bot_intents.priority', 'bot_intents.end_interaction'])
			.getOneOrFail();
	}

}