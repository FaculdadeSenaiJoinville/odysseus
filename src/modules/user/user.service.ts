import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';
import { getRepository } from 'typeorm';

@Injectable()
export class UserService {

	public async create(user: CreateUserDTO): Promise<User> {

		return getRepository(User).create(user);
	}

}
