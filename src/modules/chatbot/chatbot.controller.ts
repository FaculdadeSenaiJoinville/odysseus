
import { Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ApiController, AuthProtection } from 'src/common/decorators';

@ApiController('chatbot')
export class ChatbotController {

	constructor(private readonly chatbotService: ChatbotService) {}

	@Post()
	@AuthProtection()
	public async sendMessage() {

		return this.chatbotService.testBot();
	}

}
