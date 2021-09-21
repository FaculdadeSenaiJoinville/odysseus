
import { Injectable } from '@nestjs/common';
import { DialogflowHelper } from './utils/dialogflow.helper';
import { DialogflowRequest, DialogflowResponse, MessageData } from './utils/dialogflow.types';


@Injectable()
export class DialogflowService {

	constructor(private readonly dialogflowHelper: DialogflowHelper) {}

	public async sendMessage(messageData: MessageData): Promise<DialogflowResponse> {

		const request = this.dialogflowHelper.setRequest(messageData);

		return this.getResponse(request);
	}

	private async getResponse(request: DialogflowRequest): Promise<DialogflowResponse> {

		const sessionClient = this.dialogflowHelper.setSessionClient();
		const responses = await sessionClient.detectIntent(request);

		return {
			bot_message: responses[0].queryResult.fulfillmentText,
			intent_name: responses[0].queryResult.intent.displayName,
			parameters: responses[0].queryResult.parameters,
			user_message: responses[0].queryResult.queryText
		};
	}

}
