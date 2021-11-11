import { Injectable } from '@nestjs/common';
import { DialogflowService } from './dialogflow/dialogflow.service';
import { MessageDataDTO } from './dto/message-data.dto';

@Injectable()
export class ChatbotService {

	constructor(private readonly dialogflowService: DialogflowService) {}

	public sendMessage(messageData: MessageDataDTO) {

		return this.dialogflowService.sendMessage(messageData);
	}

}
