import { Injectable } from '@nestjs/common';
import { DialogflowService } from './dialogflow/dialogflow.service';
import { Intent } from './dialogflow/utils/dialogflow.types';
import { CreateIntentDTO } from './dto/create-intent.dto';

@Injectable()
export class ChatbotService {

	constructor(private readonly dialogflowService: DialogflowService) {}

	public async createIntent(body: CreateIntentDTO) {

		const intent = new Intent(body);

		const createdIntent = await this.dialogflowService.createIntent(intent);

		// cadastrar no banco de dados

		return createdIntent;
	}

}
