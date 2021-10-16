import { HttpService, Injectable } from '@nestjs/common';
import { DIALOGFLOW_AUTH_SCOPES, DIALOGFLOW_CREDENTIALS } from './utils/dialogflow.config';
import { google } from 'googleapis';
import { Intent } from './utils/dialogflow.types';

@Injectable()
export class DialogflowService {

	constructor(private readonly httpService: HttpService) {}

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

		return this.httpService.post(url, intent_body, { headers }).toPromise().then(response => {

			const { trainingPhrases } = intent_body;

			return {
				...response.data,
				trainingPhrases
			};
		});
	}

	public async updateIntent(intent_body: Intent): Promise<Intent> {

		const unauthorizedUrl = ``;
		const { url, headers } = await this.getApiConfig(unauthorizedUrl);

		return this.httpService.post(url, intent_body, { headers }).toPromise().then(response => {

			return response.data;
		});
	}

	public async deleteIntent() {

		const unauthorizedUrl = ``;
		const { url, headers } = await this.getApiConfig(unauthorizedUrl);

		return this.httpService.delete(url, { headers }).toPromise().then(response => {

			return response.data;
		});
	}

}
