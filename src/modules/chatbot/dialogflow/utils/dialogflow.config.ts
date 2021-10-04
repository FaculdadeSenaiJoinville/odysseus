import * as dotenv from 'dotenv';
import { DialogflowCredentials } from './dialogflow.types';

dotenv.config();

const dialogflow_api_uri = 'https://dialogflow.googleapis.com';

export const DIALOGFLOW_CREDENTIALS: DialogflowCredentials = {
	type: 'service_account',
	project_id: process.env.BOT_POJECT_ID,
	private_key_id: process.env.BOT_PRIVATE_KEY_ID,
	private_key: process.env.BOT_PRIVATE_KEY,
	client_email: process.env.BOT_CLIENT_EMAIL,
	client_id: process.env.BOT_CLIENT_ID,
	client_x509_cert_url: process.env.BOT_CLIENT_CERT_URL
};

export const DIALOGFLOW_ENPOINTS = {
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	create_intent: `${dialogflow_api_uri}/v2/projects/${DIALOGFLOW_CREDENTIALS.project_id}}/agent/intents`
};
