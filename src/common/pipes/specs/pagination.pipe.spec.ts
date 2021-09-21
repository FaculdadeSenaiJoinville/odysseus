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

	it.each([
		[
			{
				vehicle_id: '484',
				type: undefined,
				sortField: 'start_date',
				sortOrder: 'DESC',
				page: '1',
				perPage: '5'
			},
			'type',
			{
				skip: 0,
				take: 5,
				where: {
					vehicle_id: 484
				},
				order: {
					start_date: 'DESC'
				}
			}
		],
		[
			{
				type: 'all',
				sortField: 'start_date',
				sortOrder: 'DESC',
				page: '12',
				perPage: '5'
			},
			'type',
			{
				skip: 55,
				take: 5,
				order: {
					start_date: 'DESC'
				}
			}
		]
	])('should validateAndFormatSchema fit where condition with allowed values', (pagination, specialField, expected) => {

		const findManyOptions = {
			skip: 20,
			take: 400
		};

		expect(paginationPipe.validateAndFormatSchema(pagination as any, specialField)).toEqual({
			...findManyOptions,
			...expected
		});
	});

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