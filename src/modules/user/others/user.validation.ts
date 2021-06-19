import { Dictionary } from 'odyssey-dictionary';
import * as Yup from 'yup';

export const CREATE_USER_VALIDATION = Yup.object().shape({
    name: Yup
        .string()
        .typeError(Dictionary.users.getMessage('invalid_type', { field: 'name', type: 'string' }))
        .required(Dictionary.users.getMessage('required_field', { field: 'name' })),
    email: Yup
        .string()
        .email(Dictionary.users.getMessage('invalid_email'))
        .required(Dictionary.users.getMessage('required_field', { field: 'email' })),
    password: Yup
        .string()
        .typeError(Dictionary.users.getMessage('invalid_type', { field: 'password', type: 'string' }))
        .min(8, Dictionary.users.getMessage('characters_min', { field: 'password', value: 8 }))
        .required(Dictionary.users.getMessage('required_field', { field: 'password' }))
});
