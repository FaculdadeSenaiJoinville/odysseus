import * as Joi from 'joi';
import buildValidation from '../../../common/helpers/validation.helper';

export const CREATE_USER_VALIDATION = buildValidation('users', {
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	confirm_password: Joi.string().min(8).required(),
	type: Joi.string().required(),
	groups: Joi.array().items(Joi.object()).allow(null),
	trails: Joi.array().items(Joi.object()).allow(null)
});

export const UPDATE_PASSWORD_VALIDATION = buildValidation('users', {
	password: Joi.string().min(8).required(),
	confirm_password: Joi.string().min(8).required()
});

export const UPDATE_USER_VALIDATION = buildValidation('users', {
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	type: Joi.string().required(),
	active: Joi.boolean().required(),
	groups: Joi.array().items(Joi.object()).allow(null),
	groups_to_leave: Joi.array().items(Joi.object()).allow(null),
	trails: Joi.array().items(Joi.object()).allow(null),
	trails_to_leave: Joi.array().items(Joi.object()).allow(null)
});
