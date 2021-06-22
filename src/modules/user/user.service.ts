import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';
import { BcryptHelper } from 'src/common/helpers';
import { MySQLRepositoryService } from 'src/core/repositories';

@Injectable()
export class UserService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly bcryptHelper: BcryptHelper
	) {}

	public async create(user: CreateUserDTO): Promise<User> {

		user.password = await this.bcryptHelper.hashString(user.password);

		const newUser = this.mysqlRepository.get(User).create(user);
		
		return this.mysqlRepository.get(User).save(newUser);
	}

}
