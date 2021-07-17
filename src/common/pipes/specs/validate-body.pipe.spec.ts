import { BadRequestException } from '@nestjs/common';
import { JoiMessages } from 'odyssey-dictionary';
import { CREATE_USER_VALIDATION } from 'src/modules/user/others/users.validation';
import { ValidateBodyPipe } from '../validate-body.pipe';

describe('Validate Body Pipe', () => {

	const validateBodyPipe = new ValidateBodyPipe(CREATE_USER_VALIDATION);

	it('should receive a valid user payload and validate it', () => {

		const input = {
			name: 'Maria',
			email: 'maria@gmail.com',
			password: 'Teste@123',
			type: 'STUDENT'
		};

		expect(validateBodyPipe.transform(input)).resolves.toEqual(true);
	});

	it('should receive an invalid user payload and return an error message', () => {

		const input = {
			name: 'Maria',
			password: 'Teste@123',
			type: 'STUDENT'
		};
		const detail = {
			type: 'any.required',
			context: {
				key: 'email'
			}
		};
		const expected = new BadRequestException(JoiMessages.translate('users', detail));

		expect(validateBodyPipe.transform(input)).rejects.toEqual(expected);
	});
});
