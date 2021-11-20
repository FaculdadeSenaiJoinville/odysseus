import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiController, AuthProtection } from '../../../common/decorators';
import { ValidateBodyPipe } from '../../../common/pipes';
import { ListOptions } from '../../../common/types';
import { BotUser } from '../../../core/database/entities';
import { UpsertBotUserDTO } from './dto/create-bot-user.dto';
import { BotUserService as BotUserService } from './bot-user.service';
import { BotUserPaginationPipe } from './utils/bot-user-pagination.pipe';
import { BotUserRepository } from './utils/bot-user.repository';
import { CREATE_BOT_USER_VALIDATION } from './utils/bot-user.validation';

@ApiController('chatbot/user')
export class BotUserController {

	constructor(
		private readonly botUserService: BotUserService,
		private readonly botUserRepository: BotUserRepository
	) {}

	@Get('/details/:id')
	@AuthProtection()
	public details(@Param('id') id: string): Promise<BotUser> {

		return this.botUserRepository.details(id);
	}

	@Get('/list')
	@AuthProtection()
	public list(@Query(new BotUserPaginationPipe()) options: ListOptions<BotUser>) {

		return this.botUserRepository.list(options);
	}

	@Post('/create')
	@AuthProtection()
	public create(@Body(new ValidateBodyPipe(CREATE_BOT_USER_VALIDATION)) body: UpsertBotUserDTO) {

		return this.botUserService.create(body);
	}

	@Put('/update/:id')
	@AuthProtection()
	public update(@Param('id') id: string, @Body(new ValidateBodyPipe(CREATE_BOT_USER_VALIDATION)) body: UpsertBotUserDTO) {

		return this.botUserService.update(id, body);
	}

	@Delete('/remove/:id')
	@AuthProtection()
	public remove(@Param('id') id: string) {

		return this.botUserService.remove(id);
	}

}
