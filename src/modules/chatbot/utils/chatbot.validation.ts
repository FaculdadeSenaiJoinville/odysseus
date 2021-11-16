import * as Joi from 'joi';
import buildValidation from '../../../common/helpers/validation.helper';

export const SEND_MESSAGE_VALIDATION = buildValidation('users', {
	message: Joi.string().required(),
	session_id: Joi.string().required(),
	language_code: Joi.string()
});
