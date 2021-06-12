import { UnauthorizedException } from "@nestjs/common";
import { authMessages } from "src/core/messages";
import { generateRepositoryService } from "src/tests/generate-repository-service";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { AuthPolicies } from "../others/auth.policies";

const repositoryService = generateRepositoryService();
const tokenService = {
	create: jest.fn(),
	delete: jest.fn()
};
const bcryptHelper = {
	compareStringToHash: jest.fn()
};
const authPolicies = new AuthPolicies(bcryptHelper as any);
const authService = new AuthService(
	repositoryService as any,
	tokenService as any,
	authPolicies as any
);
const authController = new AuthController(authService);

describe('Token', () => {

	describe('Login', () => {

		it('should receive an input and return a message and a token', async () => {
			
			const input = {
				email: 'joao.teste@gmail.com',
				password: 'João@123',
				expiresIn: 84000
			};
			const expected = {
				message: authMessages.send('successfully_logged_in'),
				token: '7ye9g7sd8a7sdgas8d8sdasddas'
			};

			repositoryService.mysql().findOneOrFail.mockResolvedValue(input);
			bcryptHelper.compareStringToHash.mockResolvedValue(true);
			tokenService.create.mockResolvedValue(expected.token);

			await expect(authController.login(input)).resolves.toEqual(expected);
		});

		it('should receive an input and return an error (unknown user)', async () => {
			
			const input = {
				email: 'joao.teste@gmail.com',
				password: 'João@123',
				expiresIn: 84000
			};
			const expected = new UnauthorizedException(authMessages.send('user_not_found'));

			repositoryService.mysql().findOneOrFail.mockResolvedValue(null);

			await expect(authController.login(input)).rejects.toEqual(expected);
		});

		it('should receive an input and return an error (wrong password)', async () => {
			
			const input = {
				email: 'joao.teste@gmail.com',
				password: 'JoãoSenhaErrada@123',
				expiresIn: 84000
			};
			const databaseUser = {
				email: 'joao.teste@gmail.com',
				password: 'João@123',
			};
			const expected = new UnauthorizedException(authMessages.send('user_not_found'));

			repositoryService.mysql().findOneOrFail.mockResolvedValue(databaseUser);
			bcryptHelper.compareStringToHash.mockResolvedValue(false);

			await expect(authController.login(input)).rejects.toEqual(expected);
		});
	});

	describe('Logout', () => {

		it('should receive an id and return a success message', async () => {
			
			const input = '7ye9g7sd8a7sdgas8d8sdasddas';
			const expected = {
				message: authMessages.send('successfully_logged_out')
			};

			tokenService.delete.mockResolvedValue('');

			await expect(authController.logout(input)).resolves.toEqual(expected);
		});
	});
});
