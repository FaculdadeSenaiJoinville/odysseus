import * as Joi from 'joi';
import buildValidation from '../../../../common/helpers/validation.helper';

export const CREATE_BOT_USER_VALIDATION = buildValidation('bot_contents', {
	name: Joi.string().required(),
	email: Joi.string().required,
	chat_id: Joi.number().required
});
