import { Injectable } from '@nestjs/common';
import { ListOptions } from 'src/common/types';
import { MySQLRepositoryService } from 'src/core/repository';
import { User } from '../../../core/database/mysql/entities';

@Injectable()
export class UsersRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: ListOptions<User>): Promise<[User[], number]> {

		const queryBuilder = this.mysqlRepository.get(User).createQueryBuilder('users')
			.select(['users.id', 'users.name', 'users.email', 'users.type', 'users.active']);

		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
			.getManyAndCount();
	}

	public async details(id: string): Promise<User> {

		return this.mysqlRepository.get(User).createQueryBuilder('users')
			.where({ id })
			.select(['users.id', 'users.name', 'users.email', 'users.type'])
			.getOneOrFail();
	}

}