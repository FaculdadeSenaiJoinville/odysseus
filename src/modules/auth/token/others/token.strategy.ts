import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Token } from "src/core/database/mongo/entities";
import { User } from "src/core/database/mysql/entities";
import { getConnectionManager } from "typeorm";
import { TokenPayload } from "./token.type";

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

        const databaseToken = await getConnectionManager().get('mongoConnection').getRepository(Token).findOneOrFail({ user_id: payload.id });

        if (!databaseToken) {

            return false;
        }

		global.app_session.user = payload as User;

        return { id: payload.id };
    }

}
