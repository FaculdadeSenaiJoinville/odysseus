import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../../common/types';
import { BotContent } from '../../../../core/database/entities';

@Injectable()
export class BotContentRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: ListOptions<BotContent>): Promise<[BotContent[], number]> {

		const queryBuilder = this.mysqlRepository.get(BotContent).createQueryBuilder('bot_contents')
			.select(['bot_contents.id', 'bot_contents.name', 'bot_contents.explanation', 'bot_contents.link'])

		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
			.getManyAndCount();
	}

	public async details(id: string): Promise<BotContent> {

		return this.mysqlRepository.get(BotContent).createQueryBuilder('bot_contents')
			.where({ id })
			.select(['bot_contents.id', 'bot_contents.name', 'bot_contents.explanation', 'bot_contents.link'])
			.getOneOrFail();
	}

}