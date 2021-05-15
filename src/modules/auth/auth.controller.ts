import { Body, Delete, Headers, Post } from '@nestjs/common';
import { YupValidationPipe } from 'src/common/pipes';
import { ApiController } from '../../core/decorators';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { LoginOutput, LogoutOutput } from './others/auth.type';
import { LOGIN_VALIDATION } from './others/auth.validation';

@ApiController('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Post('login')
	public async login(@Body(new YupValidationPipe(LOGIN_VALIDATION)) loginInput: LoginDTO): Promise<LoginOutput> {

		return this.authService.login(loginInput);
	}

	@Delete('logout')
	public async logout(@Headers('Authorization') token: string): Promise<LogoutOutput> {

		return this.authService.logout(token);
	}

}
