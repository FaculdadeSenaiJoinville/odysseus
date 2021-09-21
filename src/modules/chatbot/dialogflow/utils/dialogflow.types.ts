import { google } from '@google-cloud/dialogflow/build/protos/protos';

export type MessageData = {
	language_code: string;
	message: string;
	session_id: string;
};

export type QueryInputText = {
	text: string;
	languageCode: string;
}

export type QueryInput = {
	text: QueryInputText;
}

export type DialogflowRequest = {
	session: string;
	queryInput: QueryInput;
}

export type ParameterKeys = {
	stringValue: string;
	king: string;
}

export type ParametersFields = {
	[key: string]: ParameterKeys; 
}

export type ResponseParameters = {
	fields: ParametersFields;
}

export type DialogflowResponse = {
	bot_message: string;
	intent_name: string;
	parameters: google.protobuf.IStruct;
	user_message: string;
}
