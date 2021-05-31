import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BcryptHelper } from 'src/common/helpers';
import { TokenService } from './token.service';
import { TokenHelper } from './others/token.helper';
import { TokenStrategy } from './others/token.strategy';
import { ErrorModule } from '../../../core/error/error.module';

@Module({
    imports: [
        ErrorModule,
        ConfigModule.forRoot(),
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
