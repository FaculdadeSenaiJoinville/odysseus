import { Injectable } from '@nestjs/common';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../common/types';
import { Trail } from '../../../core/database/entities';
import { session } from '../../../core/session';

@Injectable()
export class TrailsRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(options: ListOptions<Trail>): Promise<[Trail[], number]> {

		const queryBuilder = this.mysqlRepository.get(Trail).createQueryBuilder('trails')
			.select(['trails.id', 'trails.name', 'trails.email', 'trails.type', 'trails.active']);

		return this.mysqlRepository
			.setFindOptions(queryBuilder, options)
			.getManyAndCount();
	}

	public async details(id: string): Promise<Trail> {

		return this.mysqlRepository.get(Trail).createQueryBuilder('trails')
			.where({ id })
			.select(['trails.id', 'trails.name', 'trails.email', 'trails.type', 'trails.active'])
			.getOneOrFail();
	}

	public async profile(): Promise<Trail> {

		const id = session.getUser().id;

		return this.mysqlRepository.get(Trail).createQueryBuilder('trails')
			.where({ id })
			.select(['trails.name', 'trails.email', 'trails.type'])
			.getOneOrFail();
	}

}