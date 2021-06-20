import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptHelper } from 'src/common/helpers';
import { TokenService } from './token.service';
import { TokenHelper } from './others/token.helper';
import { TokenStrategy } from './others/token.strategy';
import { ErrorModule } from '../../../core/error/error.module';
import * as dotenv from 'dotenv';
import { RepositoryModule } from 'src/core/repository/repository.module';

dotenv.config();

@Module({
	imports: [
		RepositoryModule,
		ErrorModule,
		JwtModule.register({
			secret: process.env.JWT_KEY
		})
	],
	providers: [
		TokenService,
		TokenStrategy,
		TokenHelper,
		BcryptHelper
	],
	exports: [
		TokenService
	]
})
export class TokenModule {}
