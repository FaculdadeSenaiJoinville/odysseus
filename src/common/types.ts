import { FindManyOptions } from 'typeorm'

export type BaseMessage = {
	message: string;
}

export type SuccessSaveMessage = BaseMessage & {
	id: string;
}

export type GenericObject = {
	[key: string]: any;
}

export enum CommonFilter {
	all
}

export type ListOptions<Entity> = FindManyOptions<Entity> & {
	like: string;
}
