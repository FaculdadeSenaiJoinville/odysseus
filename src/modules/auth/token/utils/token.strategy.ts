import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Dictionary } from 'odyssey-dictionary';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/core/database/entities';
import { session } from 'src/core/session';
import { getConnectionManager } from 'typeorm';
import { Token } from '../../../../core/database/entities/token.entity';
import { TokenPayload } from './token.type';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {

	constructor() {

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_KEY
		});
	} 

	public async validate(payload: TokenPayload) {

		const databaseToken = await getConnectionManager().get('mysqlConnection').getRepository(Token).findOneOrFail({ user_id: payload.id });

		if (!databaseToken) {

			throw new UnauthorizedException(Dictionary.auth.getMessage('unauthorized'));
		}

		session.setUser(payload as User);

		return { id: payload.id };
	}

}
