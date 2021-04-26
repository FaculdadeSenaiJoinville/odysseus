import { miscMessages, userMessages } from 'src/core/messages';
import * as Yup from 'yup';

export const CREATE_USER_VALIDATION = Yup.object().shape({
    name: Yup
        .string()
        .typeError(miscMessages.send('invalid_type', { field: 'name', type: 'string' }))
        .required(userMessages.send('required_field', { field: 'name' })),
    email: Yup
        .string()
        .email(userMessages.send('invalid_email'))
        .required(userMessages.send('required_field', { field: 'email' })),
    password: Yup
        .string()
        .typeError(miscMessages.send('invalid_type', { field: 'password', type: 'string' }))
        .min(8, miscMessages.send('characters_min', { field: 'password', value: 8 }))
        .required(miscMessages.send('required_field', { field: 'password' }))
});
