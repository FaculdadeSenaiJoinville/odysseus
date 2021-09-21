import { SessionsClient } from '@google-cloud/dialogflow';
import { Injectable } from '@nestjs/common';
import { CREDENTIALS } from '../../../../core/credentials/dialogflow';
import { DialogflowRequest, MessageData } from './dialogflow.types';

@Injectable()
export class DialogflowHelper {

	public setSessionClient(): SessionsClient {

		const configuration = {
			credentials: {
				private_key: CREDENTIALS.private_key,
				client_email: CREDENTIALS.client_email
			}
		};

		return new SessionsClient(configuration);
	}

	public setRequest(messageData: MessageData): DialogflowRequest {

		const { language_code, session_id, message } = messageData;
		const project_id = CREDENTIALS.project_id;
		const sessionClient = this.setSessionClient();
		const sessionPath = sessionClient.projectAgentSessionPath(project_id, session_id);
		
		return {
			session: sessionPath,
			queryInput: {
				text: {
					text: message,
					languageCode: language_code
				}
			}
		};
	}

}
