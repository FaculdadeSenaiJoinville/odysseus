import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenRepository } from "./token.repository";
import { TokenPayload } from "./token.type";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly tokenRepository: TokenRepository) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY
        });
    } 

    public async validate({ id }: TokenPayload) {

        const databaseToken = await this.tokenRepository.findByUserId(id);

        if (!databaseToken) {

            return false;
        }

        return { id };
    }

}
