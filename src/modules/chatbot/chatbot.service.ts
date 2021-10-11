import { Injectable } from '@nestjs/common';
import { DialogflowService } from './dialogflow/dialogflow.service';

@Injectable()
export class ChatbotService {

	constructor(private readonly dialogflowService: DialogflowService) {}

	createIntent() {

		const intentBody = {
			'displayName': 'Mãssss Essa Intent é Fakssde',
			'auto': true,
			'condition': '',
			'conditionalFollowupEvents': [],
			'conditionalResponses': [],
			'context': [],
			'contexts': [],
			'endInteraction': false,
			'fallbackIntent': false,
			'liveAgentHandoff': false,
			'parentId': null,
			'followUpIntents': [],
			'priority': 500000,
			'responses': [
				{
					'action': 'input.welcome',
					'affectedContexts': [],
					'parameters': [
						{
							'noInputPromptMessages': [],
							'noMatchPromptMessages': [],
							'promptMessages': [],
							'defaultValue': '',
							'name': 'date-time',
							'dataType': '@sys.date-time',
							'isList': false,
							'required': false,
							'prompts': [],
							'value': '$date-time',
							'outputDialogContexts': []
						},
						{
							'noInputPromptMessages': [],
							'noMatchPromptMessages': [],
							'promptMessages': [],
							'defaultValue': '',
							'name': 'time-period',
							'dataType': '@sys.time-period',
							'isList': false,
							'required': false,
							'prompts': [],
							'value': '$time-period',
							'outputDialogContexts': []
						}
					],
					'defaultResponsePlatforms': {},
					'messages': [
						{
							'type': 'message',
							'condition': '',
							'speech': [
								'Olá! Qual é o problema?',
								'Oi! Qual sua dúvida?',
								'Hey! Está com alguma dúvida?'
							]
						}
					],
					'resetContexts': false
				}
			],
			'rootParentId': null,
			'templates': [],
			'userSays': [
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'boa ',
							'userDefined': false
						},
						{
							'text': 'tarde',
							'userDefined': false,
							'alias': 'time-period',
							'meta': '@sys.time-period'
						}
					],
					'count': 0,
					'id': '27df0388-abed-4a46-874b-90ab563ebed0',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'bom dia',
							'userDefined': false
						}
					],
					'count': 0,
					'id': '96e624bf-940c-48f5-8019-c9af704b7a7c',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'boa ',
							'userDefined': false
						},
						{
							'text': 'noite',
							'userDefined': false,
							'alias': 'date-time',
							'meta': '@sys.date-time'
						}
					],
					'count': 0,
					'id': '1671eddc-1b07-46e7-befc-ca03321ccce6',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'olá',
							'userDefined': false
						}
					],
					'count': 0,
					'id': '35a8d8b7-9b19-41a7-b63d-0b3b1b5ea24f',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'oi',
							'userDefined': false
						}
					],
					'count': 0,
					'id': '2ff06cc7-cf3e-4887-9f69-2a4152c46600',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'opa',
							'userDefined': false
						}
					],
					'count': 0,
					'id': '9c2d037b-41ba-4d84-ad07-c42d5332472a',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'fala aí',
							'userDefined': false
						}
					],
					'count': 0,
					'id': 'c0a8096f-b93e-417e-933c-dc718e1e0bce',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'fala',
							'userDefined': false
						}
					],
					'count': 0,
					'id': '87392ca2-17a7-41b4-928a-92707afe4817',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'saudações',
							'userDefined': false
						}
					],
					'count': 0,
					'id': 'f2418fc7-7eb9-4f68-9490-7f48e6e2eb69',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'oi tudo bem',
							'userDefined': false
						}
					],
					'count': 0,
					'id': 'a0dcb644-7970-46e5-8e32-0571f9c5b104',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'e aí',
							'userDefined': false
						}
					],
					'count': 0,
					'id': '0f4dd8f4-a5ed-4ad7-99a5-3833fd04c9c0',
					'updated': null
				},
				{
					'isTemplate': false,
					'data': [
						{
							'text': 'eae',
							'userDefined': false
						}
					],
					'count': 0,
					'id': '3ead8e76-b018-4ed4-b17f-89303b4b72bd',
					'updated': null
				}
			],
			'webhookForSlotFilling': false,
			'webhookUsed': false
		};

		return this.dialogflowService.createIntent(intentBody);
	}

}
