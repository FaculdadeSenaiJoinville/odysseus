import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';
import { RepositoryService } from 'src/core/repository/repository.service';
import { BcryptHelper } from 'src/common/helpers';

@Injectable()
export class UserService {

	constructor(
		private readonly repositoryService: RepositoryService,
		private readonly bcryptHelper: BcryptHelper
	) {}

	public async create(user: CreateUserDTO): Promise<User> {

		user.password = await this.bcryptHelper.hashString(user.password);

		return this.repositoryService.mysql(User).save(user);
	}

}
