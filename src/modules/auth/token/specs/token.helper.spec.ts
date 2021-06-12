import { User } from "src/core/database/mysql/entities";
import { TokenHelper } from "../others/token.helper";

const jwtService = {
	signAsync: jest.fn(),
	verifyAsync: jest.fn()
};
const tokenHelper = new TokenHelper(jwtService as any);

describe('Token Helper', () => {

	describe('Generate Token', () => {

		it('should receive an input and return a token', async () => {
			
			const input = {
				user: new User(),
				expiresIn: 84000
			};
			const expected = 'ey9d7dasbakbfias.asdasdgiasgi';

			process.env.JWT_KEY = 'jwt_key_test';

			jwtService.signAsync.mockResolvedValue(expected)

			await expect(tokenHelper.generateToken(input.user, input.expiresIn)).resolves.toEqual(expected);
		});
	});

	describe('Get User Data', () => {

		it('should receive a token and return user data', async () => {
			
			const input = 'ey9d7dasbakbfias.asdasdgiasgi';

			jwtService.verifyAsync.mockResolvedValue(true)

			await expect(tokenHelper.getUserData(input)).resolves.toEqual(new User());
		});
	});
});
