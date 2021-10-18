import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../common/types';
import { User } from '../../../core/database/entities';
import { session } from '../../../core/session';

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
			.select(['users.id', 'users.name', 'users.email', 'users.type', 'users.active', 'groups.id', 'groups.name'])
			.leftJoin('users.groups', 'groups')
			.getOneOrFail();
	}

	public async profile(): Promise<User> {

		const id = session.getUser().id;

		return this.mysqlRepository.get(User).createQueryBuilder('users')
			.where({ id })
			.select(['users.name', 'users.email', 'users.type', 'groups.name', 'groups.description'])
			.leftJoin('users.groups', 'groups')
			.getOneOrFail();
	}

}