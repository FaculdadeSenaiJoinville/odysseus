
import { HttpService, Injectable } from '@nestjs/common';
import { DIALOGFLOW_CREDENTIALS } from './utils/dialogflow.config';
import { DialogflowHelper } from './utils/dialogflow.helper';

@Injectable()
export class DialogflowService {

	constructor(
		private readonly dialogflowHelper: DialogflowHelper,
		private readonly httpService: HttpService
	) {}

	public async sendMessage() {

		const intentBody = {
			name: '',
			displayName: '',
			webhookState: 'WEBHOOK_STATE_UNSPECIFIED',
			priority: 0,
			isFallback: true,
			mlDisabled: true,
			liveAgentHandoff: true,
			endInteraction: true,
			inputContextNames: [
				''
			],
			events: [
				''
			],
			trainingPhrases: [
				{
					name: '',
					type: 'TYPE_UNSPECIFIED',
					parts: [
						{
							text: '',
							entityType: '',
							alias: '',
							userDefined: true
						}
					],
					timesAddedCount: 0  
				}
			],
			action: '',
			outputContexts: [
				{
					name: '',
					lifespanCount: 0
				}
			],
			resetContexts: true,
			parameters: [
				{
					name: '',
					displayName: '',
					value: '',
					defaultValue: '',
					entityTypeDisplayName: '',
					mandatory: true,
					prompts: [
				  ''
					],
					isList: true
				}
			],
			messages: [
				{
					platform: 'TELEGRAM',

					// Union field message can be only one of the following:
					text: {
						text: [
							''
						]
					}
				// End of list of possible types for union field message.
				}
			],
			defaultResponsePlatforms: [
				'TELEGRAM'
			],
			rootFollowupIntentName: '',
			parentFollowupIntentName: '',
			followupIntentInfo: [
				{
					followupIntentName: '',
					parentFollowupIntentName: ''
				}
			]
		}
		const endpoint = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents`
		const createdIntent = await this.httpService.post(endpoint, intentBody, {headers: {Authorization: 'tokenApi'}}).toPromise();
		//const request = this.dialogflowHelper.setRequest(messageData);

		//return this.getResponse(request);
		return createdIntent;
	}

}
