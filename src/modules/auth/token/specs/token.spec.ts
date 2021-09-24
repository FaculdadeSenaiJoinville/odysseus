import { User } from 'src/core/database/entities';
import { generateMySqlRepositoryService } from 'src/tests/generate-repository-service';
import { TokenService } from '../token.service';

const repositoryService = generateMySqlRepositoryService();
const bcryptHelper = {
	hashString: jest.fn()
};
const tokenHelper = {
	generateToken: jest.fn(),
	getUserData: jest.fn()
};
const tokenService = new TokenService(
	repositoryService as any,
	tokenHelper as any,
	bcryptHelper as any
);

describe('Token', () => {

	describe('Create', () => {

		it('should receive an input and return a bearer token', async () => {
			
			const input = {
				user: new User(),
				expiresIn: 84000
			};
			const token = 'ey9df2234fsdfsdf1dfdf.asdasda.d1afdfsf';
			const encryptedToken = '$jdisjdijaisaidhasdhjkjxkcj';
			const expected = `Bearer ${token}`;

			tokenHelper.generateToken.mockResolvedValue(token);
			bcryptHelper.hashString.mockResolvedValue(encryptedToken);

			await expect(tokenService.create(input.user, input.expiresIn)).resolves.toEqual(expected);
		});
	});

	describe('Delete', () => {

		it('should receive a token and resolves', async () => {
			
			const input = 'ey9df2234fsdfsdf1dfdf.asdasda.d1afdfsf';

			tokenHelper.getUserData.mockResolvedValue(new User());

			expect(tokenService.delete(input)).resolves;
		});
	});
});
