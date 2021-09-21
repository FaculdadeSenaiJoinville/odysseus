import * as Joi from 'joi';
import buildValidation from '../../../../common/helpers/validation.helper';

export const SEND_MESSAGE_VALIDATION = buildValidation('users', {
	language_code: Joi.string().required(),
	message: Joi.string().required(),
	session_id: Joi.string().required()
});
