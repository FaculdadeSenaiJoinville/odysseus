import { Injectable } from '@nestjs/common';
import { User } from 'src/core/database/mysql/entities';
import { MySQLRepositoryService } from 'src/core/repositories';
import { UsersPolicies } from './users.policies';

@Injectable()
export class UsersRepository {

	constructor (
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly usersPolicies: UsersPolicies
	) {}

	public async getOne(id: string): Promise<User> {

		const user = await this.mysqlRepository.findOne(User, id);

		this.usersPolicies.mustHaveUser(user);

		return user;
	}

	public list(): Promise<User[]> {

		return this.mysqlRepository.findAll(User);
	}

}
