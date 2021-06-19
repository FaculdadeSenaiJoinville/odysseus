import { User } from "src/core/database/mysql/entities";
import { generateRepositoryService } from "src/tests/generate-repository-service";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";

const repositoryService = generateRepositoryService();
const bcryptHelper = {
	hashString: jest.fn()
};
const userService = new UserService(
	repositoryService as any,
	bcryptHelper as any
);
const userController = new UserController(userService);

describe('Users', () => {

	describe('Create', () => {

		it('should receive an input and return a new user', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: 'João@123'
			};
			const expected = new User();

			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			repositoryService.mysql().save.mockResolvedValue(new User());

			await expect(userController.create(input)).resolves.toEqual(expected);
		});
	});
});
