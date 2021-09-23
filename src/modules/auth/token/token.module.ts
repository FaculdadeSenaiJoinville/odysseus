import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptHelper } from 'src/common/helpers';
import { TokenService } from './token.service';
import { TokenHelper } from './others/token.helper';
import { TokenStrategy } from './others/token.strategy';
import { ErrorsModule } from '../../../core/error/errors.module';
import * as dotenv from 'dotenv';
import { MongoRepositoryModule } from 'src/core/repository';

dotenv.config();

@Module({
	imports: [
		MongoRepositoryModule,
		ErrorsModule,
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
