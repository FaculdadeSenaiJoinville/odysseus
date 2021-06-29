import { Injectable } from '@nestjs/common';
import { EntityTarget, getConnectionManager } from 'typeorm';

@Injectable()
export class MySQLRepositoryService {

	public get<Entity>(target: EntityTarget<Entity>) {

		return getConnectionManager().get('mysqlConnection').getRepository(target);
	}

	public save<Entity>(target: EntityTarget<Entity>, value: Entity) {

		const payload = this.get(target).create(value);

		return this.get(target).save(payload);
	}

	public delete<Entity>(target: EntityTarget<Entity>, id: string) {

		return this.get(target).delete(id);
	}

}
