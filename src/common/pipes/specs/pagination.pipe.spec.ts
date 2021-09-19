import { PaginationPipe } from '../pagination.pipe';
import * as Joi from 'joi';
import { UnprocessableEntityException } from '@nestjs/common';
import { PAGINATION_SCHEMA } from 'src/core/repositories/pagination/pagination.validation';

describe('PaginationPipe test', () => {

	const schema = {
		...PAGINATION_SCHEMA,
		type: Joi.string()
	};
	const sortOrderValues = [
		'name',
		'email'
	];
	const paginationPipe = new PaginationPipe('users', schema, sortOrderValues);

	it('should call validateAndFormatSchema and throw an error', () => {

		const pagination = {
			type: 'ADMIN',
			sortField: 'invalid_sort_field',
			sortOrder: 'DESC',
			page: '1',
			perPage: '5'
		};

		expect(() => paginationPipe.validateAndFormatSchema(pagination as any, 'type')).toThrow(UnprocessableEntityException);
	});
});