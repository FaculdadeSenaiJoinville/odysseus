import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../../common/types';
import { BotHistory } from '../../../../core/database/entities';

@Injectable()
export class BotHistoryRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: ListOptions<BotHistory>): Promise<[BotHistory[], number]> {

		const queryBuilder = this.mysqlRepository.get(BotHistory).createQueryBuilder('bot_histories')
			.orderBy('bot_histories.created_at', 'DESC')
			.select(['bot_histories.id', 'bot_histories.user_name', 'bot_histories.user_message', 'bot_histories.bot_response', 'bot_histories.chat_id', 'bot_histories.created_at'])

		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
			.getManyAndCount();
	}

	public async details(id: string): Promise<BotHistory> {

		return this.mysqlRepository.get(BotHistory).createQueryBuilder('bot_histories')
			.where({ id })
			.select(['bot_histories.id', 'bot_histories.user_name', 'bot_histories.user_message', 'bot_histories.bot_response', 'bot_histories.chat_id', 'bot_histories.created_at'])
			.getOneOrFail();
	}

}