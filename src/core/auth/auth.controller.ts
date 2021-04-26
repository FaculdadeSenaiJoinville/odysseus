import { Body, Controller, Delete, Headers, Post } from '@nestjs/common';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput, LogoutOutput } from './others/auth.type';
import { LOGIN_VALIDATION } from './others/auth.validation';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Post('login')
	public async login(@Body(new YupValidationPipe(LOGIN_VALIDATION)) loginInput: LoginInput): Promise<LoginOutput> {

		return this.authService.login(loginInput);
	}

	@Delete('logout')
	public async logout(@Headers('Authorization') token: string): Promise<LogoutOutput> {

		return this.authService.logout(token);
	}

}
