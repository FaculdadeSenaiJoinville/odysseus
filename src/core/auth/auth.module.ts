import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from './token/token.module';
import { AuthPolicies } from './others/auth.policies';
import { BcryptHelper } from 'src/common/helpers';

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
		BcryptHelper
	],
})
export class AuthModule {}
