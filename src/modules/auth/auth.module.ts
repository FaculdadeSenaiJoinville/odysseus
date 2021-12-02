import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from './token/token.module';
import { AuthPolicies } from './utils/auth.policies';
import { Base64Helper, BcryptHelper } from 'src/common/helpers';
import { MySQLRepositoryModule } from '../../core/repository';
import { EmailModule } from '../../core/email/email.module';

@Module({
	imports: [
		MySQLRepositoryModule,
		TokenModule,
		EmailModule
	],
	controllers: [
		AuthController
	],
	providers: [
		AuthService,
		AuthPolicies,
		BcryptHelper,
		Base64Helper
	]
})
export class AuthModule {}
