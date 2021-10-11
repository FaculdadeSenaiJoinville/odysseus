import { HttpService, Injectable } from '@nestjs/common';
import { DIALOGFLOW_AUTH_SCOPES, DIALOGFLOW_CREDENTIALS, GOOGLE_APIS_ENPOINTS } from './utils/dialogflow.config';
import { google } from 'googleapis';

@Injectable()
export class DialogflowService {

	constructor(private readonly httpService: HttpService) {}

	private async getApiKey() {

		const teste = new google.auth.GoogleAuth({
			scopes: DIALOGFLOW_AUTH_SCOPES,
			credentials: {
				client_id: DIALOGFLOW_CREDENTIALS.client_id,
				private_key: DIALOGFLOW_CREDENTIALS.private_key,
				client_email: DIALOGFLOW_CREDENTIALS.client_email,
				type: DIALOGFLOW_CREDENTIALS.type,
				token_url: GOOGLE_APIS_ENPOINTS.token_url,
				quota_project_id: DIALOGFLOW_CREDENTIALS.project_id
			}
		});

		return teste;
	}

	public async createIntent(intentBody) {

		const apiKey = await this.getApiKey();
		const createIntentUrl = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents`;

		const teste = await apiKey.getRequestHeaders(createIntentUrl);


		return this.httpService.post(createIntentUrl, intentBody).toPromise();
	}

}
