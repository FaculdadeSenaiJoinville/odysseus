import * as Joi from 'joi';
import buildValidation from '../../../common/helpers/validation.helper';

export const LOGIN_VALIDATION = buildValidation('auth', {
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	expiresIn: Joi.number().min(84000).required()
});
