import * as Joi from 'joi';
import buildValidation from '../../../common/helpers/validation.helper';

export const CREATE_INTENT_VALIDATION = buildValidation('bot_intents', {
	name: Joi.string().required()
});
