
import { Injectable } from '@nestjs/common';
import { DialogflowService } from './dialogflow/dialogflow.service';

@Injectable()
export class ChatbotService {

	constructor(
		private readonly dialogflowService: DialogflowService
	){}

	createIntent() {
		
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
		};

		return this.dialogflowService.createIntent(intentBody);
	}

}
