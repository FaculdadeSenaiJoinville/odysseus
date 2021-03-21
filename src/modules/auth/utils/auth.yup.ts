import { miscMessages, userMessages } from 'src/messages';
import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email: Yup
        .string()
        .email(userMessages.send('invalid_email'))
        .required(userMessages.send('required_field', { field: 'email' })),

    password: Yup
        .string()
        .required(userMessages.send('required_field', { field: 'password' })),

    expiresIn: Yup
        .number()
        .min(84000, miscMessages.send('min_value', { field: 'expiresIn', value: 84000 }))
        .typeError(miscMessages.send('invalid_type', { field: 'expiresIn', type: 'number' }))
        .required(userMessages.send('required_field', { field: 'expiresIn' }))
});
