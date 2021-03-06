
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AdminProfessorProtection, ApiController, AuthProtection } from '../../../common/decorators';
import { ValidateBodyPipe } from '../../../common/pipes';
import { ListOptions } from '../../../common/types';
import { BotIntent } from '../../../core/database/entities';
import { UpsertIntentDTO } from './dto/upsert-intent.dto';
import { BotIntentService } from './intent.service';
import { BotIntentPaginationPipe } from './utils/bot-intent-pagination.pipe';
import { BotIntentRepository } from './utils/bot-intent.repository';
import { UPSERT_INTENT_VALIDATION } from './utils/bot-intent.validation';

@ApiController('chatbot/intent')
export class BotIntentController {

	constructor(
		private readonly botIntentService: BotIntentService,
		private readonly botIntentRepository: BotIntentRepository
	) {}

	@Get('/details/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public details(@Param('id') id: string): Promise<BotIntent> {

		return this.botIntentRepository.details(id);
	}

	@Get('/list')
	@AuthProtection()
	@AdminProfessorProtection()
	public list(@Query(new BotIntentPaginationPipe()) options: ListOptions<BotIntent>) {

		return this.botIntentRepository.list(options);
	}

	@Post('/create')
	@AuthProtection()
	@AdminProfessorProtection()
	public create(@Body(new ValidateBodyPipe(UPSERT_INTENT_VALIDATION)) body: UpsertIntentDTO) {

		return this.botIntentService.create(body);
	}

	@Put('/update/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public update(@Param('id') id: string, @Body(new ValidateBodyPipe(UPSERT_INTENT_VALIDATION)) body: UpsertIntentDTO) {

		return this.botIntentService.update(id, body);
	}

	@Delete('/remove/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public remove(@Param('id') id: string) {

		return this.botIntentService.remove(id);
	}

}
