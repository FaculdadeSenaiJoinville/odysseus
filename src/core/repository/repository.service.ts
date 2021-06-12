import { Injectable } from '@nestjs/common';
import { EntityTarget, getConnectionManager } from 'typeorm';

@Injectable()
export class RepositoryService {

	public mongo<Entity>(target: EntityTarget<Entity>) {

		return getConnectionManager().get('mongoConnection').getRepository(target);
	}

	public mysql<Entity>(target: EntityTarget<Entity>) {

		return getConnectionManager().get('mysqlConnection').getRepository(target);
	}

}
