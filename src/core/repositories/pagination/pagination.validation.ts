import * as Joi from 'joi';

const SORT_FIELD_REGEX = /^[a-zA-z\._]+$/;
const SORT_ORDER_VALUES = ['asc', 'ASC', 'desc', 'DESC', '', null];

export const PAGINATION_SCHEMA = {
	page: Joi.number().default(1),
	perPage: Joi.number().default(10).max(10),
	sortField: Joi.string().regex(SORT_FIELD_REGEX),
	sortOrder: Joi.string().valid(...SORT_ORDER_VALUES).uppercase(),
	like: Joi.string()
};
