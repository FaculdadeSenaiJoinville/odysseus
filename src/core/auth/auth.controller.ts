import { Body, Controller, Delete, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput, LogoutOutput } from './others/auth.types';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Post('login')
	public async login(@Body() loginInput: LoginInput): Promise<LoginOutput> {

		return this.authService.login(loginInput);
	}

	@Delete('logout')
	public async logout(@Headers('Authorization') token: string): Promise<LogoutOutput> {

		return this.authService.logout(token);
	}

}
