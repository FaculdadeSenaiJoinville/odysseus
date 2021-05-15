import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/core/database/mysql/entities";
import { ErrorService } from "src/core/error/error.service";
import { BcryptHelper } from "src/common/helpers";
import { Repository } from "typeorm";
import { CreateUserDTO } from "../dtos/create-user.dto";

@Injectable()
export class UserRepository {

    constructor(
        @Inject('USER_REPOSITORY')
		private readonly repository: Repository<User>,
        private readonly bcryptHelper: BcryptHelper,
        private readonly errorService: ErrorService
    ) {}

    public findByEmail(email: string): Promise<User> {

        return this.repository.findOne({ email });
    }

    public findById(id: number): Promise<User> {

        return this.repository.findOne(id);
    }

    public async create(user: CreateUserDTO): Promise<User> {

        user.password = await this.bcryptHelper.hashString(user.password);

        return await this.repository.save(user)
            .then(response => response)
			.catch(this.errorService.throwMySQLError);
    }

}
