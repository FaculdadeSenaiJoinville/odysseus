import * as Joi from 'joi';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { CommonFilter, GenericObject } from '../types';
import { PAGINATION_SCHEMA } from '../../core/repositories/pagination/pagination.validation';
import { JoiDetail } from 'odyssey-dictionary/dist/types/joi.type';
import { JoiMessages } from 'odyssey-dictionary';
import { IPagination } from '../../core/repositories/pagination/pagination.type';
import { paginate, sort } from '../../core/repositories/pagination/pagination.helper';

@Injectable()
export class PaginationPipe<E> {

	constructor(
		private readonly schema: GenericObject,
		private readonly sortFieldValues: string[]) { }

	public validateAndFormatSchema(pagination: IPagination, specialFieldFillter?: string | string[]): FindManyOptions<E> {

		const value = this.validateSchema(pagination);

		const options: FindManyOptions<E> = {
			order: sort(value),
			...paginate(value)
		};

		return this.fitWhereWithQueryParams(options, value, specialFieldFillter);
	}

	public validateSchema(pagination: IPagination) {

		const { value, error } = Joi.compile(this.schema).validate(pagination);

		if (error) {

			throw new UnprocessableEntityException(error.details.map(detail => JoiMessages.translate(this.schema.module, detail as JoiDetail)).join('; '));
		}

		if (value.sortField && this.sortFieldValues.length && !this.sortFieldValues.includes(value.sortField)) {

			throw new UnprocessableEntityException(`Valor inválido ${value.sortField}`);
		}

		return value;
	}

	public fitWhereWithQueryParams(options: FindManyOptions<E>, query: GenericObject, specialField?: string | string[]) {

		this.checkAditionalField(query, specialField);

		for (const key of Object.keys(query)) {

			if (
				(typeof query[key] === 'boolean' || query[key])
				&& !Object.keys(PAGINATION_SCHEMA).includes(key)
			) {

				options.where = {
					...(options.where as GenericObject),
					[key]: query[key]
				};
			}
		}

		return options;
	}

	private checkAditionalField(query: GenericObject, aditionalField?: string | string[]) {

		if (aditionalField) {

			if (Array.isArray(aditionalField)) {

				for (const field of aditionalField) {

					this.clearAditionalFieldWhenNecessary(query, field);
				}
			} else {

				this.clearAditionalFieldWhenNecessary(query, aditionalField);
			}
		}
	}

	private clearAditionalFieldWhenNecessary(query: GenericObject, field: string) {

		if (this.hasAllFilterIntoQueryParams(query, field)) {

			query[field] = '';
		}
	}

	private hasAllFilterIntoQueryParams(query: GenericObject, field: string) {

		return (Object.keys(query).includes(field) && query[field] === CommonFilter.all)
			|| (Array.isArray(query[field]) && (query[field] as unknown[]).some(fieldValue => fieldValue === CommonFilter.all));
	}
}