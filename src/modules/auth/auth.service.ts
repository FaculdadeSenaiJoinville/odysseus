import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/others/user.repository';
import { TokenService } from './token/token.service';
import { AuthPolicies } from './others/auth.policies';
import { authMessages } from 'src/core/messages';
import { LoginOutput, LogoutOutput } from './others/auth.type';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {

	constructor(
		private readonly tokenService: TokenService,
		private readonly userRepository: UserRepository,
		private readonly authPolicies: AuthPolicies
	) {}

	public async login({ email, password, expiresIn }: LoginDTO): Promise<LoginOutput> {

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
