import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repositories';
import { FindManyOptions } from 'typeorm';
import { Group } from '../../../core/database/mysql/entities';

@Injectable()
export class GroupRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: FindManyOptions<Group>): Promise<[Group[], number]> {

		const queryBuilder = this.mysqlRepository.get(Group).createQueryBuilder('groups')
			.select(['groups.id', 'groups.name', 'groups.description']);

		if (options.where) {

			queryBuilder.where(options.where);
		}

		return this.mysqlRepository
			.setPaginationAndOrder(queryBuilder, options)
			.getManyAndCount();
	}

	public async details(id: string): Promise<Group> {

		return this.mysqlRepository.get(Group).createQueryBuilder('groups')
			.where({ id })
			.select(['groups.id', 'groups.name', 'groups.description', 'users.id', 'users.name', 'users.type'])
			.leftJoin('groups.users', 'users')
			.getOneOrFail();
	}

}
