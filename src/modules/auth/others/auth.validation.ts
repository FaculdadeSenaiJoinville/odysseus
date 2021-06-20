import { Dictionary } from 'odyssey-dictionary';
import * as Yup from 'yup';

export const LOGIN_VALIDATION = Yup.object().shape({
	email: Yup
		.string()
		.email(Dictionary.auth.getMessage('invalid_email'))
		.required(Dictionary.auth.getMessage('required_field', { field: 'email' })),
	password: Yup
		.string()
		.typeError(Dictionary.auth.getMessage('invalid_type', { field: 'password', type: 'string' }))
		.required(Dictionary.auth.getMessage('required_field', { field: 'password' })),
	expiresIn: Yup
		.number()
		.typeError(Dictionary.auth.getMessage('invalid_type', { field: 'expiresIn', type: 'number' }))
		.min(84000, Dictionary.auth.getMessage('min_value', { field: 'expiresIn', value: 84000 }))
		.required(Dictionary.auth.getMessage('required_field', { field: 'expiresIn' }))
});
