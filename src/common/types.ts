import { FindManyOptions } from 'typeorm'

export type SuccessSaveMessage = {
	message: string,
	id: string
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