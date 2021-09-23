import { PaginationPipe } from '../pagination.pipe';
import * as Joi from 'joi';
import { UnprocessableEntityException } from '@nestjs/common';
import { PAGINATION_SCHEMA } from '../utils/pagination.validation';

describe('PaginationPipe test', () => {

	const schema = {
		...PAGINATION_SCHEMA,
		type: Joi.string(),
		name: Joi.string()
	};
	const sortOrderValues = [
		'name',
		'email'
	];
	const paginationPipe = new PaginationPipe('users', schema, sortOrderValues);

	it.each([
		[
			{
				name: 'Gabriel',
				type: 'ADMIN',
				sortField: 'name',
				sortOrder: 'DESC',
				page: '1',
				perPage: '5'
			},
			'type',
			{
				skip: 0,
				take: 5,
				where: {
					name: 'Gabriel',
					type: 'ADMIN'
				},
				order: {
					name: 'DESC'
				}
			}
		],
		[
			{
				type: 'all',
				sortField: 'email',
				sortOrder: 'ASC',
				page: '12',
				perPage: '5'
			},
			'type',
			{
				skip: 55,
				take: 5,
				where: {
					type: 'all'
				},
				order: {
					email: 'ASC'
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

	it.each([
		[
			{
				active: 'invalid_status',
				sortField: 'name',
				sortOrder: 'DESC',
				page: '1',
				perPage: '20'
			},
			{
				context: {
					key: 'active',
					label: 'active',
					value: 'invalid_number'
				},
				message: '"active" must be a number',
				path: [
					'active'
				],
				type: 'number.base'
			}
		],
		[
			{
				active: true,
				sortField: 'name',
				sortOrder: 'invalid_field_value',
				page: '1',
				perPage: '5'
			},
			{
				context: {
					key: 'sortOrder',
					label: 'sortOrder',
					valids: [
						'asc',
						'ASC',
						'desc',
						'DESC',
						'',
						null
					],
					value: 'INVALID_FIELD_VALUE'
				},
				message: '"sortOrder" must be one of [asc, ASC, desc, DESC, , null]',
				path: [
					'sortOrder'
				],
				type: 'any.only'
			}
		]
	])('should validateAndFormatSchema throw a UnprocessableEntityException with joi message', (pagination, error) => {

		expect(() => paginationPipe.validateAndFormatSchema(pagination as any, 'type')).toThrow(UnprocessableEntityException);
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