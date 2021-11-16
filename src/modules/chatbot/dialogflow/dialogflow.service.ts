import { SessionsClient } from '@google-cloud/dialogflow';
import { google } from 'googleapis';
import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { DIALOGFLOW_AUTH_SCOPES, DIALOGFLOW_CREDENTIALS } from './utils/dialogflow.config';
import { DialogflowRequest, DialogflowResponse, Intent } from './utils/dialogflow.types';
import { MessageDataDTO } from '../dto/message-data.dto';

@Injectable()
export class DialogflowService {

	constructor(private readonly httpService: HttpService) {}

	public async listIntents() {

		const unauthorizedUrl = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents`;
		const { url, headers } = await this.getApiConfig(unauthorizedUrl);

		return this.httpService.get(url, { headers }).toPromise().then(response => {

			return response.data;
		});
	}

	public async getIntent(id: string): Promise<Intent> {

		const unauthorizedUrl = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents/${id}`;
		const { url, headers } = await this.getApiConfig(unauthorizedUrl);

		return this.httpService.get(url, { headers }).toPromise().then(response => {

			return response.data;
		});
	}

	public async createIntent(intent_body: Intent): Promise<Intent> {

		const unauthorizedUrl = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents`;
		const { url, headers } = await this.getApiConfig(unauthorizedUrl);

		return this.httpService.post(url, intent_body, { headers }).toPromise()
			.then(response => {

				const { trainingPhrases } = intent_body;

				return {
					...response.data,
					trainingPhrases
				};
			})
			.catch(error => {

				throw new BadRequestException(error.response.data.error.message);
			});
	}

	public async updateIntent(id: string, intent_body: Intent): Promise<Intent> {

		const unauthorizedUrl = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents/${id}`;
		const { url, headers } = await this.getApiConfig(unauthorizedUrl);

		return this.httpService.patch(url, intent_body, { headers }).toPromise()
			.then(response => {

				const { trainingPhrases } = intent_body;

				return {
					...response.data,
					trainingPhrases
				};
			})
			.catch(error => {

				throw new BadRequestException(error.response.data.error.message);
			});
	}

	public async deleteIntent(id: string) {

		const unauthorizedUrl = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents/${id}`;
		const { url, headers } = await this.getApiConfig(unauthorizedUrl);

		return this.httpService.delete(url, { headers }).toPromise().then(response => {

			return response.data;
		});
	}

	public async sendMessage(messageData: MessageDataDTO): Promise<DialogflowResponse> {

		const request = this.getRequest(messageData);

		return this.getResponse(request);
	}

	private async getApiConfig(url: string) {

		const teste = new google.auth.GoogleAuth({
			scopes: DIALOGFLOW_AUTH_SCOPES,
			credentials: {
				client_id: DIALOGFLOW_CREDENTIALS.client_id,
				private_key: DIALOGFLOW_CREDENTIALS.private_key,
				client_email: DIALOGFLOW_CREDENTIALS.client_email
			}
		});

		return teste.authorizeRequest({ url });
	}

	private async getResponse(request: DialogflowRequest): Promise<DialogflowResponse> {

		const sessionClient = this.getSessionClient();
		const responses = await sessionClient.detectIntent(request);

		return {
			intent_name: responses[0].queryResult.intent.displayName,
			user_message: responses[0].queryResult.queryText,
			bot_response: responses[0].queryResult.fulfillmentMessages.map(message => message.text.text[0]),
			parameters: responses[0].queryResult.parameters
		};
	}

	private getSessionClient(): SessionsClient {

		const configuration = {
			credentials: {
				private_key: DIALOGFLOW_CREDENTIALS.private_key,
				client_email: DIALOGFLOW_CREDENTIALS.client_email
			}
		};

		return new SessionsClient(configuration);
	}

	private getRequest(messageData: MessageDataDTO): DialogflowRequest {

		const { session_id, message } = messageData;
		const project_id = DIALOGFLOW_CREDENTIALS.project_id;
		const sessionClient = this.getSessionClient();
		const sessionPath = sessionClient.projectAgentSessionPath(project_id, session_id);
		
		return {
			session: sessionPath,
			queryInput: {
				text: {
					text: message,
					languageCode: 'pt-br'
				}
			}
		};
	}

}
