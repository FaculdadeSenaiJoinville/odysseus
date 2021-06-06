import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';
import { getRepository } from 'typeorm';
import { RepositoryService } from 'src/core/repository/repository.service';

@Injectable()
export class UserService {

	constructor(private readonly repositoryService: RepositoryService) {}

	public async create(user: CreateUserDTO): Promise<User> {

		return this.repositoryService.mysql(User).create(user);
	}

}
