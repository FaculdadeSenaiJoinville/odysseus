import { Injectable } from '@nestjs/common';
import { UserRepository } from './others/user.repository';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';

@Injectable()
export class UserService {

	constructor(private readonly userRepository: UserRepository) {}

	public async create(user: CreateUserDTO): Promise<User> {

		return this.userRepository.create(user);
	}

}
