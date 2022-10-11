import * as Joi from 'joi';
import buildValidation from '../../../common/helpers/validation.helper';

export const UPSERT_GROUP_VALIDATION = buildValidation('groups', {
	name: Joi.string().required(),
	description: Joi.string().allow('', null),
	members: Joi.array().items(Joi.object()),
	members_to_remove: Joi.array().items(Joi.object()),
	trails: Joi.array().items(Joi.object()),
	trails_to_remove: Joi.array().items(Joi.object())
});
