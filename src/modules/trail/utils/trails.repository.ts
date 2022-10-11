import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../common/types';
import { Trail } from '../../../core/database/entities';

@Injectable()
export class TrailsRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: ListOptions<Trail>): Promise<[Trail[], number]> {

		const queryBuilder = this.mysqlRepository.get(Trail).createQueryBuilder('trails')
			.select(['trails.id', 'trails.name', 'trails.description','trails.status','trails.updated_by']);
			
		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
			.getManyAndCount();
	}

	public async details(id: string): Promise<Trail> {

		return this.mysqlRepository.get(Trail).createQueryBuilder('trails')
			.where({ id })
			.select(['trails.id', 'trails.icon', 'trails.color', 'trails.name', 'trails.description', 'trails.status', 'trails.active', 'groups.id', 'groups.name', 'users.id', 'users.name'])
			.leftJoin('trails.users', 'users')
			.leftJoin('trails.groups', 'groups')
			.getOneOrFail();
	}

}