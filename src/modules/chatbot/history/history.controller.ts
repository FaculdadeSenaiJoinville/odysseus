import { Get, Param, Query } from '@nestjs/common';
import { ApiController, AuthProtection } from '../../../common/decorators';
import { ListOptions } from '../../../common/types';
import { BotHistory } from '../../../core/database/entities';
import { BotHistoryService } from './history.service';
import { BotHistoryPaginationPipe } from './utils/bot-history-pagination.pipe';
import { BotHistoryRepository } from './utils/bot-history.repository';

@ApiController('chatbot/history')
export class BotHistoryController {

	constructor(
		private readonly botHistoryService: BotHistoryService,
		private readonly botHistoryRepository: BotHistoryRepository
	) {}

	@Get('/details/:id')
	@AuthProtection()
	public details(@Param('id') id: string): Promise<BotHistory> {

		return this.botHistoryRepository.details(id);
	}

	@Get('/list')
	@AuthProtection()
	public list(@Query(new BotHistoryPaginationPipe()) options: ListOptions<BotHistory>) {

		return this.botHistoryRepository.list(options);
	}

}
