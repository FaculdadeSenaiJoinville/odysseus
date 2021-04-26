import { miscMessages, userMessages } from 'src/core/messages';
import * as Yup from 'yup';

export const LOGIN_VALIDATION = Yup.object().shape({
    email: Yup
        .string()
        .email(userMessages.send('invalid_email'))
        .required(userMessages.send('required_field', { field: 'email' })),
    password: Yup
        .string()
        .typeError(miscMessages.send('invalid_type', { field: 'password', type: 'string' }))
        .required(userMessages.send('required_field', { field: 'password' })),
    expiresIn: Yup
        .number()
        .typeError(miscMessages.send('invalid_type', { field: 'expiresIn', type: 'number' }))
        .min(84000, miscMessages.send('min_value', { field: 'expiresIn', value: 84000 }))
        .required(userMessages.send('required_field', { field: 'expiresIn' }))
});
