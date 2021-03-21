import { Body, Controller, Delete, Headers, Post } from '@nestjs/common';
import { LoginInput, LoginOutput, LogoutOutput } from 'src/types/modules';
import { AuthService } from './auth.service';

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
