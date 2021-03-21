import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/utils/user.repository';
import { TokenService } from '../token/token.service';
import { AuthPolicies } from './utils/auth.policies';
import { loginValidation } from './utils/auth.yup';
import { YupHelper } from 'src/helpers';
import { LoginInput, LoginOutput, LogoutOutput } from 'src/types/modules';
import { authMessages } from 'src/messages';

@Injectable()
export class AuthService {

	constructor(
		private readonly yupHelper: YupHelper,
		private readonly tokenService: TokenService,
		private readonly userRepository: UserRepository,
		private readonly authPolicies: AuthPolicies
	) {}

	public async login({ email, password, expiresIn }: LoginInput): Promise<LoginOutput> {

		await this.yupHelper.validate(loginValidation, { email, password, expiresIn });

		const databaseUser = await this.userRepository.findByEmail(email);

		this.authPolicies.mustHaveThisUserInDatabase(databaseUser);

		await this.authPolicies.mustBeTheSamePassword(password, databaseUser.password);

		const token = await this.tokenService.create(databaseUser, expiresIn);

		return {
			message: authMessages.send('login_successful'),
			token
		};
	}

	public async logout(token: string): Promise<LogoutOutput> {

		await this.tokenService.delete(token);

		return {
			message: authMessages.send('logout_successful')
		};
	}

}
