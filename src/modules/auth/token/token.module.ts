import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptHelper } from 'src/common/helpers';
import { TokenService } from './token.service';
import { TokenHelper } from './utils/token.helper';
import { TokenStrategy } from './utils/token.strategy';
import { ErrorModule } from '../../../core/error/errors.module';
import { MySQLRepositoryModule } from '../../../core/repository';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
	imports: [
		MySQLRepositoryModule,
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
