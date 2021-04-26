import { Injectable } from '@nestjs/common';
import { UserRepository } from './others/user.repository';
import { CreateUserOutput } from './others/user.type';
import { userMessages } from 'src/core/messages';
import { User } from 'src/core/database/mysql/entities';

@Injectable()
export class UserService {

	constructor(private readonly userRepository: UserRepository) {}

	public async create(user: User): Promise<CreateUserOutput> {

		const createdUser = await this.userRepository.create(user);

		return {
            message: userMessages.send('create_successful'),
            id: createdUser.id
        };
	}

}
