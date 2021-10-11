import { HttpService, Injectable } from '@nestjs/common';
import { DIALOGFLOW_CREDENTIALS } from './utils/dialogflow.config';

@Injectable()
export class DialogflowService {

	constructor(private readonly httpService: HttpService) {}

	private async getApiKey() {

		return 'aaaaaa';
	}

	public async createIntent(intentBody) {

		const apiKey = await this.getApiKey();
		const createIntentUrl = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}/agent/intents?key=${apiKey}`;

		return this.httpService.post(createIntentUrl, intentBody).toPromise();
	}

}
