
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AdminProfessorProtection, ApiController, AuthProtection } from '../../../common/decorators';
import { ValidateBodyPipe } from '../../../common/pipes';
import { ListOptions } from '../../../common/types';
import { BotContent } from '../../../core/database/entities';
import { UpsertContentDTO } from './dto/create-content.dto';
import { BotContentService } from './content.service';
import { BotContentPaginationPipe } from './utils/bot-content-pagination.pipe';
import { BotContentRepository } from './utils/bot-content.repository';
import { CREATE_CONTENT_VALIDATION } from './utils/bot-content.validation';

@ApiController('chatbot/content')
export class BotContentController {

	constructor(
		private readonly botContentService: BotContentService,
		private readonly botContentRepository: BotContentRepository
	) {}

	@Get('/details/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public details(@Param('id') id: string): Promise<BotContent> {

		return this.botContentRepository.details(id);
	}

	@Get('/list')
	@AuthProtection()
	@AdminProfessorProtection()
	public list(@Query(new BotContentPaginationPipe()) options: ListOptions<BotContent>) {

		return this.botContentRepository.list(options);
	}

	@Post('/create')
	@AuthProtection()
	@AdminProfessorProtection()
	public create(@Body(new ValidateBodyPipe(CREATE_CONTENT_VALIDATION)) body: UpsertContentDTO) {

		return this.botContentService.create(body);
	}

	@Put('/update/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public update(@Param('id') id: string, @Body(new ValidateBodyPipe(CREATE_CONTENT_VALIDATION)) body: UpsertContentDTO) {

		return this.botContentService.update(id, body);
	}

	@Delete('/remove/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public remove(@Param('id') id: string) {

		return this.botContentService.remove(id);
	}

}
