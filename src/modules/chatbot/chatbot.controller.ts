
import { Body, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ApiController } from 'src/common/decorators';
import { ValidateBodyPipe } from '../../common/pipes';
import { SEND_MESSAGE_VALIDATION } from './utils/chatbot.validation';
import { MessageDataDTO } from './dto/message-data.dto';

@ApiController('chatbot')
export class ChatbotController {

	constructor(private readonly chatbotService: ChatbotService) {}

	@Post('message')
	public sendMessage(@Body(new ValidateBodyPipe(SEND_MESSAGE_VALIDATION)) messageData: MessageDataDTO) {

		return this.chatbotService.sendMessage(messageData);
	}

}
