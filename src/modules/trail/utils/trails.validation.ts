import * as Joi from 'joi';
import buildValidation from '../../../common/helpers/validation.helper';

export const CREATE_TRAIL_VALIDATION = buildValidation('trails', {
	name: Joi.string().required(),
	description: Joi.string().required(),
	icon: Joi.string().required()
});

export const UPDATE_PASSWORD_VALIDATION = buildValidation('users', {
	password: Joi.string().min(8).required(),
	confirm_password: Joi.string().min(8).required()
});

export const UPDATE_USER_VALIDATION = buildValidation('trails', {
	name: Joi.string().required(),
	description: Joi.string().required(),
	icon: Joi.string().required()
});
