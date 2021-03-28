import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/core/database/database.module';
import { BcryptHelper } from 'src/helpers';
import { TokenService } from './token.service';
import { TokenHelper } from './others/token.helper';
import { TokenRepository } from './others/token.repository';
import { TokenStrategy } from './others/token.strategy';
import { tokenProvider } from './others/tokens.provider';
import { ErrorModule } from '../../error/error.module';

@Module({
    imports: [
        DatabaseModule,
        ErrorModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_KEY
        })
    ],
	providers: [
        ...tokenProvider,
        TokenService,
        TokenRepository,
        TokenStrategy,
        TokenHelper,
        BcryptHelper
    ],
    exports: [
        TokenService
    ]
})
export class TokenModule {}
