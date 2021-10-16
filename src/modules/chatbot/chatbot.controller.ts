
import { Body, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ApiController, AuthProtection } from 'src/common/decorators';
import { CreateIntentDTO } from './dto/create-intent.dto';
import { CREATE_INTENT_VALIDATION } from './utils/chatbot.validation';
import { ValidateBodyPipe } from '../../common/pipes';

@ApiController('chatbot')
export class ChatbotController {

	constructor(private readonly chatbotService: ChatbotService) {}

	@Post('create-intent')
	//@AuthProtection()
	public async sendMessage(@Body(new ValidateBodyPipe(CREATE_INTENT_VALIDATION)) body: CreateIntentDTO) {

		return this.chatbotService.createIntent(body);
	}

}
