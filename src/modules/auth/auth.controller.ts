import { Body, Delete, Headers, Post, Get } from '@nestjs/common';
import { ValidateBodyPipe } from 'src/common/pipes';
import { ApiController, AuthProtection } from '../../common/decorators';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { LoginOutput, LogoutOutput } from './utils/auth.type';
import { LOGIN_VALIDATION, REQUEST_PASSWORD_RESET_VALIDATION } from './utils/auth.validation';
import { session } from 'src/core/session';
import { User } from 'src/core/database/entities';
import { RequestPasswordResetDTO } from './dto/request-password-reset.dto';
import { BaseMessage } from '../../common/types';

@ApiController('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Get('me')
	@AuthProtection()
	public me(): User {
	
		return session.getUser();
	}

	@Post('request-password-reset')
	public async requestPasswordReset(@Body(new ValidateBodyPipe(REQUEST_PASSWORD_RESET_VALIDATION)) body: RequestPasswordResetDTO): Promise<BaseMessage> {

		return this.authService.requestPasswordReset(body);
	}

	@Post('login')
	public async login(@Body(new ValidateBodyPipe(LOGIN_VALIDATION)) loginInput: LoginDTO): Promise<LoginOutput> {

		return this.authService.login(loginInput);
	}

	@Delete('logout')
	@AuthProtection()
	public async logout(@Headers('Authorization') token: string): Promise<LogoutOutput> {

		return this.authService.logout(token);
	}

}
