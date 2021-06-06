import { Body, Delete, Headers, Post } from '@nestjs/common';
import { ValidateBodyPipe } from 'src/common/pipes';
import { ApiController } from '../../common/decorators';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { LoginOutput, LogoutOutput } from './others/auth.type';
import { LOGIN_VALIDATION } from './others/auth.validation';

@ApiController('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Post('login')
	public async login(@Body(new ValidateBodyPipe(LOGIN_VALIDATION)) loginInput: LoginDTO): Promise<LoginOutput> {

		return this.authService.login(loginInput);
	}

	@Delete('logout')
	public async logout(@Headers('Authorization') token: string): Promise<LogoutOutput> {

		return this.authService.logout(token);
	}

}
