import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { AuthPolicies } from './others/auth.policies';
import { BcryptHelper, YupHelper } from 'src/helpers';

@Module({
	imports: [
		TokenModule,
		UserModule
	],
	controllers: [
		AuthController
	],
	providers: [
		AuthService,
		AuthPolicies,
		BcryptHelper,
		YupHelper
	],
})
export class AuthModule {}
