
import { Body, Get, Post, Query } from '@nestjs/common';
import { ApiController, AuthProtection } from '../../../common/decorators';
import { ValidateBodyPipe } from '../../../common/pipes';
import { ListOptions } from '../../../common/types';
import { BotIntent } from '../../../core/database/entities';
import { CreateIntentDTO } from './dto/create-intent.dto';
import { BotIntentService } from './intent.service';
import { BotIntentPaginationPipe } from './utils/bot-intent-pagination.pipe';
import { BotIntentRepository } from './utils/bot-intent.repository';
import { CREATE_INTENT_VALIDATION } from './utils/bot-intent.validation';

@ApiController('chatbot/intent')
export class BotIntentController {

	constructor(
		private readonly botIntentService: BotIntentService,
		private readonly botIntentRepository: BotIntentRepository
	) {}

	@Get('/list')
	@AuthProtection()
	public listIntents(@Query(new BotIntentPaginationPipe()) options: ListOptions<BotIntent>) {

		return this.botIntentRepository.listIntents(options);
	}

	@Post('/create')
	@AuthProtection()
	public createIntent(@Body(new ValidateBodyPipe(CREATE_INTENT_VALIDATION)) body: CreateIntentDTO) {

		return this.botIntentService.createIntent(body);
	}

}
