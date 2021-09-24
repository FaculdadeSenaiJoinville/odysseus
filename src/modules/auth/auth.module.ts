import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from './token/token.module';
import { AuthPolicies } from './utils/auth.policies';
import { BcryptHelper } from 'src/common/helpers';
import { MySQLRepositoryModule } from 'src/core/repository';

@Module({
	imports: [
		MySQLRepositoryModule,
		TokenModule
	],
	controllers: [
		AuthController
	],
	providers: [
		AuthService,
		AuthPolicies,
		BcryptHelper
	]
})
export class AuthModule {}
