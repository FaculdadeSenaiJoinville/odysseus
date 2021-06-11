
import { User } from 'src/core/database/mysql/entities';
import { CREATE_USER_VALIDATION } from 'src/modules/user/others/user.validation';
import { ValidateBodyPipe } from '../validate-body.pipe';

describe('Validate Body Pipe', () => {

	const validateBodyPipe = new ValidateBodyPipe(CREATE_USER_VALIDATION);

	it('should an user payload and return an instance of it', () => {

		const input = {
			name: 'Maria'
		} as User;

		expect(validateBodyPipe.transform(input)).resolves.toBeInstanceOf(User);
	});
});