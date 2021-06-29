import { Injectable } from '@nestjs/common';
import { EntityTarget, getConnectionManager, ObjectID } from 'typeorm';

@Injectable()
export class MongoRepositoryService {

	public get<Entity>(target: EntityTarget<Entity>) {

		return getConnectionManager().get('mongoConnection').getRepository(target);
	}

	public save<Entity>(target: EntityTarget<Entity>, value: Entity) {

		const payload = this.get(target).create(value);

		return this.get(target).save(payload);
	}

	public delete<Entity>(target: EntityTarget<Entity>, id: ObjectID) {

		return this.get(target).delete(id);
	}

}
