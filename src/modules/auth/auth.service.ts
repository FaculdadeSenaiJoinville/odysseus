import { Injectable } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { AuthPolicies } from './utils/auth.policies';
import { LoginOutput, LogoutOutput } from './utils/auth.type';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/core/database/entities';
import { Dictionary } from 'odyssey-dictionary';
import { FindOneOptions } from 'typeorm';
import { MySQLRepositoryService } from '../../core/repository';
import { RequestPasswordResetDTO } from './dto/request-password-reset.dto';
import { EmailService } from 'src/core/email/email.service';
import { BaseMessage } from '../../common/types';
import { Base64Helper } from '../../common/helpers';

@Injectable()
export class AuthService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly tokenService: TokenService,
		private readonly authPolicies: AuthPolicies,
		private readonly emailService: EmailService,
		private readonly base64Helper: Base64Helper
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

		await this.authPolicies.mustBeTheSamePassword(password, databaseUser.password);

		const token = await this.tokenService.create(databaseUser, expiresIn);

		return {
			message: Dictionary.auth.getMessage('successfully_logged_in'),
			token
		};
	}

	public async requestPasswordReset({ email }: RequestPasswordResetDTO): Promise<BaseMessage> {

		const user = await this.mysqlRepository.findOneOrFail(User, { email });
		const token = await this.tokenService.create(user, 600);
		const base64Token = this.base64Helper.encode(token);

		await this.emailService.sendEmail({
			to: [email],
			template: 'reset_password',
			locals: {
				name: user.name,
				link: `http://localhost:8080/auth/reset_password?token=${base64Token}}`
			}
		});

		return {
			message: Dictionary.auth.getMessage('reset_password_email_sent')
		};
	}

	public async logout(token: string): Promise<LogoutOutput> {

		await this.tokenService.delete(token);

		return {
			message: Dictionary.auth.getMessage('successfully_logged_out')
		};
	}

}
