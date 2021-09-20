import { Injectable } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { AuthPolicies } from './others/auth.policies';
import { LoginOutput, LogoutOutput } from './others/auth.type';
import { LoginDTO } from './dtos/login.dto';
import { User } from 'src/core/database/mysql/entities';
import { Dictionary } from 'odyssey-dictionary';
import { MySQLRepositoryService } from 'src/core/repositories';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class AuthService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly tokenService: TokenService,
		private readonly authPolicies: AuthPolicies
	) {}

	public async login({ email, password, expiresIn }: LoginDTO): Promise<LoginOutput> {

		const options: FindOneOptions = {
			where: { email },
			select: [
				'id',
				'name',
				'email',
				'type',
				'active',
				'password',
				'created_at',
				'updated_at',
				'created_by',
				'updated_by'
			]
		};
		const databaseUser = await this.mysqlRepository.findOneOrFail(User, options);

		this.authPolicies.mustHaveThisUserInDatabase(databaseUser);

		await this.authPolicies.mustBeTheSamePassword(password, databaseUser.password);

		const token = await this.tokenService.create(databaseUser, expiresIn);

		return {
			message: Dictionary.auth.getMessage('successfully_logged_in'),
			token
		};
	}

	public async logout(token: string): Promise<LogoutOutput> {

		await this.tokenService.delete(token);

		return {
			message: Dictionary.auth.getMessage('successfully_logged_out')
		};
	}

}
