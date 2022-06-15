import * as Joi from 'joi';
import buildValidation from '../../../common/helpers/validation.helper';

export const TRAIL_VALIDATION = buildValidation('trails', {
	name: Joi.string().required(),
	description: Joi.string().allow(null, ''),
	icon: Joi.string().required(),
	status: Joi.string().allow(null, ''),
	color: Joi.string().required(),
	active: Joi.boolean().allow(true, false)
});
