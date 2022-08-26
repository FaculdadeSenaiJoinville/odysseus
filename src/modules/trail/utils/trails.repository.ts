import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvailableTrail } from 'src/core/database/entities/available-trail.entity';
import { EntityTrailAccess } from 'src/core/database/entities/vo/entity-trail-access.entity';
import { MySQLRepositoryService } from 'src/core/repository';
import { ListOptions } from '../../../common/types';
import { Trail, User, Group } from '../../../core/database/entities';
import { session } from '../../../core/session';

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
			.select(['trails.id', 'trails.icon', 'trails.color', 'trails.name', 'trails.description','trails.status', 'trails.active'])
			.getOneOrFail();
	}

	public async access(id: string): Promise<any> {
		const repo = this.mysqlRepository.get(AvailableTrail);
		const Result = await repo
		.createQueryBuilder('available_trails')
		.innerJoinAndSelect('available_trails.trails', 'trails')
		.leftJoinAndMapOne('available_trails.users', User, 'users', 'available_trails.entity_id = users.id')
		.leftJoinAndMapOne('available_trails.groups', Group, 'groups', 'available_trails.entity_id = groups.id')
		.select(["users", "groups", "available_trails"])
		.where({ 'trails_id': id })
		.getMany();

			console.log(Result);
			console.log(id);

			return Result;
	}
	//,'users.name AS username','groups.name AS groupname'
			//.leftJoin('trails.groups', 'groups')
		//	.leftJoin('trails.users', 'users')

	public async profile(): Promise<Trail> {

		const id = session.getUser().id;

		return this.mysqlRepository.get(Trail).createQueryBuilder('trails')
			.where({ id })
			.select(['trails.name', 'trails.description','trails.status'])
			.getOneOrFail();
	}

}