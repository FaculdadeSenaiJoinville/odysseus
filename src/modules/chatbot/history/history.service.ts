import { Injectable } from '@nestjs/common';
import { BotHistory } from '../../../core/database/entities';
import { MySQLRepositoryService } from '../../../core/repository';
import { UpsertHistoryDTO } from './dto/create-history.dto';

@Injectable()
export class BotHistoryService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService
	) {}

	public async create(body: UpsertHistoryDTO): Promise<string> {

		const botHistory = new BotHistory(body);
		const savedHistory = await this.mysqlRepository.save(BotHistory, botHistory);

		return savedHistory.id;
	}

}
