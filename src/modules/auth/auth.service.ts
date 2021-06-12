import { Injectable } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { AuthPolicies } from './others/auth.policies';
import { authMessages } from 'src/core/messages';
import { LoginOutput, LogoutOutput } from './others/auth.type';
import { LoginDTO } from './dtos/login.dto';
import { User } from 'src/core/database/mysql/entities';
import { RepositoryService } from 'src/core/repository/repository.service';

@Injectable()
export class AuthService {

	constructor(
		private readonly repositoryService: RepositoryService,
		private readonly tokenService: TokenService,
		private readonly authPolicies: AuthPolicies
	) {}

	public async login({ email, password, expiresIn }: LoginDTO): Promise<LoginOutput> {

		const databaseUser = await this.repositoryService.mysql(User).findOneOrFail({ email });

		this.authPolicies.mustHaveThisUserInDatabase(databaseUser);

		await this.authPolicies.mustBeTheSamePassword(password, databaseUser.password);

		const token = await this.tokenService.create(databaseUser, expiresIn);

		return {
			message: authMessages.send('successfully_logged_in'),
			token
		};
	}

	public async logout(token: string): Promise<LogoutOutput> {

		await this.tokenService.delete(token);

		return {
			message: authMessages.send('successfully_logged_out')
		};
	}

}
