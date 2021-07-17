import { User } from 'src/core/database/mysql/entities';
import { generateRepositoryService } from 'src/tests/generate-repository-service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UserType } from '../others/users.type';
import { UsersPolicies } from '../others/users.policies';

const repositoryService = generateRepositoryService();
const bcryptHelper = {
	hashString: jest.fn()
};
const usersPolicies = new UsersPolicies();
const userService = new UsersService(
	repositoryService as any,
	bcryptHelper as any,
	usersPolicies
);
const userController = new UsersController(userService);

describe('Users', () => {

	describe('Create', () => {

		it('should receive an input and return a new user', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: 'João@123',
				type: UserType.ADMIN
			};
			const expected = new User();

			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			repositoryService.save.mockResolvedValue(new User());

			await expect(userController.create(input)).resolves.toEqual(expected);
		});
	});
});
