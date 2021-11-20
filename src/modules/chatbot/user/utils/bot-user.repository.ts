import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../../common/types';
import { BotUser } from '../../../../core/database/entities';

@Injectable()
export class BotUserRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: ListOptions<BotUser>): Promise<[BotUser[], number]> {

		const queryBuilder = this.mysqlRepository.get(BotUser).createQueryBuilder('bot_users')
			.select(['bot_users.id', 'bot_users.name', 'bot_users.explanation', 'bot_users.link'])

		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
			.getManyAndCount();
	}

	public async details(id: string): Promise<BotUser> {

		return this.mysqlRepository.get(BotUser).createQueryBuilder('bot_users')
			.where({ id })
			.select(['bot_users.id', 'bot_users.name', 'bot_users.explanation', 'bot_users.link'])
			.getOneOrFail();
	}

}