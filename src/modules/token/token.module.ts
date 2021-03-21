import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/modules/database/database.module';
import { BcryptHelper, ErrorHelper } from 'src/helpers';
import { TokenService } from './token.service';
import { TokenHelper } from './others/token.helper';
import { TokenRepository } from './others/token.repository';
import { TokenStrategy } from './others/token.strategy';
import { tokenProvider } from './others/tokens.provider';

@Module({
    imports: [
        DatabaseModule,
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
        BcryptHelper,
        ErrorHelper
    ],
    exports: [
        TokenService
    ]
})
export class TokenModule {}
