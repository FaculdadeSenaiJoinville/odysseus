import { Injectable } from '@nestjs/common';
import { User } from 'src/core/database/mysql/entities/classes/user.entity';
import { UserRepository } from './others/user.repository';
import { CreateUserOutput } from './others/user.types';
import { createUserValidation } from './others/user.yup';
import { YupHelper } from 'src/helpers';
import { userMessages } from 'src/core/messages';

@Injectable()
export class UserService {

	constructor(
		private readonly userRepository: UserRepository,
		private readonly yupHelper: YupHelper
	) {}

	public async create(user: User): Promise<CreateUserOutput> {

		await this.yupHelper.validate(createUserValidation, user);

		const createdUser = await this.userRepository.create(user);

		return {
            message: userMessages.send('create_successful'),
            id: createdUser.id
        };
	}

}
