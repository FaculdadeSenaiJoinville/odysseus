import { Inject, Injectable } from "@nestjs/common";
import { Token } from "src/database/mongo/entities";
import { BcryptHelper, ErrorHelper } from "src/helpers";
import { Repository } from "typeorm";

@Injectable()
export class TokenRepository {

    constructor(
        @Inject('TOKEN_REPOSITORY')
		private readonly repository: Repository<Token>,
        private readonly bcryptHelper: BcryptHelper,
        private readonly errorHelper: ErrorHelper
    ) {}

    public async findByUserId(user_id: number): Promise<Token> {

        return this.repository.findOne({ user_id });
    }

    public async save(tokenBody: Token): Promise<void> {

        tokenBody.token = await this.bcryptHelper.hashString(tokenBody.token);

        this.repository.save(tokenBody)
            .then(response => response)
			.catch(this.errorHelper.throwMongoError);
    }

    public async deleteByUserId(user_id: number): Promise<void> {

        this.repository.delete({ user_id });
    }

}
