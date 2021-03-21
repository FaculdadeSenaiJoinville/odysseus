import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/database/mysql/entities";
import { BcryptHelper, ErrorHelper } from "src/helpers";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {

    constructor(
        @Inject('USER_REPOSITORY')
		private readonly repository: Repository<User>,
        private readonly bcryptHelper: BcryptHelper,
        private readonly errorHelper: ErrorHelper
    ) {}

    public findByEmail(email: string): Promise<User> {

        return this.repository.findOne({ email });
    }

    public findById(id: number): Promise<User> {

        return this.repository.findOne(id);
    }

    public async create(user: User): Promise<User> {

        user.password = await this.bcryptHelper.hashString(user.password);

        return await this.repository.save(user)
            .then(response => response)
			.catch(this.errorHelper.throwMySQLError);
    }

}
