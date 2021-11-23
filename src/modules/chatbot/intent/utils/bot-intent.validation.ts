import * as Joi from 'joi';
import buildValidation from '../../../../common/helpers/validation.helper';

export const UPSERT_INTENT_VALIDATION = buildValidation('bot_intents', {
	name: Joi.string().required(),
	training_phrases: Joi.array().items(Joi.string()).required(),
	message: Joi.string().allow('', null),
	contents: Joi.array().items(Joi.object()),
	contents_to_remove: Joi.array().items(Joi.object()),
	priority: Joi.number(),
	end_interaction: Joi.boolean()
});
