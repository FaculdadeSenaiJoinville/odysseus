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

export type DialogflowCredentials = {
	type: string;
	project_id: string;
	private_key_id: string;
	private_key: string;
	client_email: string;
	client_id: string;
	client_x509_cert_url: string;
	api_key: string;
};
