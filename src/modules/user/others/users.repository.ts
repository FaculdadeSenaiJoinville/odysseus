import { Injectable } from '@nestjs/common';
import { User } from 'src/core/database/mysql/entities';
import { MySQLRepositoryService } from 'src/core/repositories';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class UsersRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public list(): Promise<User[]> {

		const options: FindManyOptions = {
			select: [
				'id',
				'name',
				'email',
				'type',
				'active'
			]
		}

		return this.mysqlRepository.findAll(User, options);
	}

}
