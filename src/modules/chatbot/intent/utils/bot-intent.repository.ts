import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../../common/types';
import { BotIntent } from '../../../../core/database/entities';

@Injectable()
export class BotIntentRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: ListOptions<BotIntent>): Promise<[BotIntent[], number]> {

		const queryBuilder = this.mysqlRepository.get(BotIntent).createQueryBuilder('bot_intents')
			.innerJoin('bot_intents.creator', 'creator')
			.select(['bot_intents.id', 'bot_intents.name', 'creator.name', 'bot_intents.created_at']);

		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
			.getManyAndCount();
	}

	public async details(id: string): Promise<BotIntent> {

		return this.mysqlRepository.get(BotIntent).createQueryBuilder('bot_intents')
			.where({ id })
			.leftJoin('bot_intents.contents', 'contents')
			.innerJoin('bot_intents.creator', 'creator')
			.select(['bot_intents.id', 'bot_intents.name', 'bot_intents.training_phrases', 'contents.id', 'contents.name', 'bot_intents.message', 'creator.name', 'bot_intents.created_at'])
			.getOneOrFail();
	}

}