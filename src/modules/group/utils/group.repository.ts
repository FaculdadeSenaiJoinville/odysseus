import { Injectable } from '@nestjs/common';
import { Group } from 'src/core/database/entities';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../common/types';

@Injectable()
export class GroupRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: ListOptions<Group>): Promise<[Group[], number]> {

		const queryBuilder = this.mysqlRepository.get(Group).createQueryBuilder('groups')
			.select(['groups.id', 'groups.name', 'groups.description']);

		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
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
