import * as Joi from 'joi';

export default function buildValidation(module: string, keys: Joi.PartialSchemaMap) {

	return {
		module,
		keys: Joi.object(keys)
	}
}
