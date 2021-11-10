import * as Joi from 'joi';
import buildValidation from '../../../../common/helpers/validation.helper';

export const UPSERT_INTENT_VALIDATION = buildValidation('bot_intents', {
	name: Joi.string().required(),
	training_phrases: Joi.array().items(Joi.string()).required(),
	message: Joi.string(),
	contents: Joi.array().items(Joi.string()),
	priority: Joi.number(),
	end_interaction: Joi.boolean()
});
