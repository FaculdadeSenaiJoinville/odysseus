import { userMessages } from 'src/core/messages';
import * as Yup from 'yup';

export const createUserValidation = Yup.object().shape({
    name: Yup
        .string()
        .required(userMessages.send('required_field', { field: 'name' })),

    email: Yup
        .string()
        .email(userMessages.send('invalid_email'))
        .required(userMessages.send('required_field', { field: 'email' })),

    password: Yup
        .string()
        .min(8, userMessages.send('characters_min', { field: 'password' }))
        .required(userMessages.send('required_field', { field: 'password' }))
});
