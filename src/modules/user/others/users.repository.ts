import { Injectable, NotFoundException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { User } from 'src/core/database/mysql/entities';
import { MySQLRepositoryService } from 'src/core/repositories';

@Injectable()
export class UsersRepository {

	constructor (private readonly mysqlRepository: MySQLRepositoryService) {}

	public async getOne(id: string): Promise<User> {

		const user = await this.mysqlRepository.findOne(User, id);

		if (!user) {
			throw new NotFoundException(Dictionary.users.getMessage('user_not_found'))
		}

		return user;
	}
	

	public list(): Promise<User[]> {

		return this.mysqlRepository.findAll(User);
	}

}
