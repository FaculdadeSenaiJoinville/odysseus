import * as Joi from 'joi';
import buildValidation from '../../../../common/helpers/validation.helper';

export const CREATE_CONTENT_VALIDATION = buildValidation('bot_contents', {
	name: Joi.string().required(),
	explanation: Joi.string().allow(null, ''),
	link: Joi.string().allow(null, '')
});
