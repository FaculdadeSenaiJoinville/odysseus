export type BaseMessage = {
	message: string;
}

export type SuccessSaveMessage = BaseMessage & {
	id: string;
}

export type SuccessRemoveMessage = {
}

export type GenericObject = {
	[key: string]: any;
}

export enum CommonFilter {
	all
}