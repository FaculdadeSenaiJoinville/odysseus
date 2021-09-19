import * as Joi from 'joi';
import buildValidation from '../../../common/helpers/validation.helper';

export const CREATE_GROUP_VALIDATION = buildValidation('groups', {
	name: Joi.string().required(),
	description: Joi.string().allow('', null),
	members: Joi.array().items(Joi.string())
});
