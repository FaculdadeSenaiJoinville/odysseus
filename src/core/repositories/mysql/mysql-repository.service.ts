import { Injectable } from '@nestjs/common';
import { DeleteResult, EntityTarget, FindConditions, FindManyOptions, FindOneOptions, getConnectionManager, Repository } from 'typeorm';
import { ErrorsService } from '../../error/errors.service';

@Injectable()
export class MySQLRepositoryService {

	constructor(private errorService: ErrorsService) {}

	public get<Entity>(target: EntityTarget<Entity>): Repository<Entity> {

		return getConnectionManager().get('mysqlConnection').getRepository(target);
	}

	public async findOne<Entity>(target: EntityTarget<Entity>, value?: string | FindOneOptions<Entity> | FindConditions<Entity>): Promise<Entity> {

		return this.get(target).findOne(value).catch(error => {

			this.errorService.throwMySQLError(error);
		});
	}

	public async findAll<Entity>(target: EntityTarget<Entity>, options?: FindManyOptions<Entity> | FindConditions<Entity>) {

		const [list, count] = await this.get(target).findAndCount(options).catch(error => {

			this.errorService.throwMySQLError(error);
		});

		return { list, count };
	}

	public async save<Entity>(target: EntityTarget<Entity>, value: Entity): Promise<Entity> {

		const payload = this.get(target).create(value);

		return this.get(target).save(payload).catch(error => {
			
			this.errorService.throwMySQLError(error);
		});
	}

	public async delete<Entity>(target: EntityTarget<Entity>, id: string): Promise<DeleteResult> {

		return this.get(target).delete(id).catch(error => {
			
			this.errorService.throwMySQLError(error);
		});
	}

}
