import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/core/database/mysql/entities";
import { BcryptHelper } from "src/helpers";
import { authMessages } from "src/core/messages";

@Injectable()
export class AuthPolicies {

    constructor(private readonly bcryptHelper: BcryptHelper) {}

    public mustHaveThisUserInDatabase(user: User): void {

        if (!user) {

            throw new UnauthorizedException(authMessages.send('user_not_found'));
        }
    }

    public async mustBeTheSamePassword(login_password: string, user_password: string): Promise<void> {

        const samePassword = await this.bcryptHelper.compareStringToHash(login_password, user_password);

        if (!samePassword) {

            throw new UnauthorizedException(authMessages.send('user_not_found'));
        }
    }

}
