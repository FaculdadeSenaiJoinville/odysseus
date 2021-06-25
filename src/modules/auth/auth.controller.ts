import { Body, Delete, Headers, Post, Get } from '@nestjs/common';
import { ValidateBodyPipe } from 'src/common/pipes';
import { ApiController, AuthProtection } from '../../common/decorators';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { LoginOutput, LogoutOutput } from './others/auth.type';
import { LOGIN_VALIDATION } from './others/auth.validation';
import { session } from 'src/core/session';
import { User } from 'src/core/database/mysql/entities';

@ApiController('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Get('me')
	@AuthProtection()
	public async me(): Promise<User> {
	
		return session.getUser();
	}

	@Post('login')
	public async login(@Body(new ValidateBodyPipe(LOGIN_VALIDATION)) loginInput: LoginDTO): Promise<LoginOutput> {

		return this.authService.login(loginInput);
	}

	@Delete('logout')
	public async logout(@Headers('Authorization') token: string): Promise<LogoutOutput> {

		return this.authService.logout(token);
	}

}
