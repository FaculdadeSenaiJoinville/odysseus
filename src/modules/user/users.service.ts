import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';
import { BcryptHelper } from 'src/common/helpers';
import { MySQLRepositoryService } from 'src/core/repositories';
import { UpdatePasswordDTO, UpdateUserDTO } from './dtos';
import { UsersPolicies } from './others/users.policies';

@Injectable()
export class UsersService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly bcryptHelper: BcryptHelper,
		private readonly usersPolicies: UsersPolicies
	) {}

	public async create(user: CreateUserDTO): Promise<User> {

		this.usersPolicies.passwordsMustBeTheSame(user.password, user.confirm_password);

		const newUser = new User();

		newUser.name = user.name;
		newUser.email = user.email;
		newUser.password = await this.bcryptHelper.hashString(user.password);
		newUser.type = user.type;

		return this.mysqlRepository.save(User, newUser);
	}

	public async updatePassword(id: string, { password, confirm_password }: UpdatePasswordDTO): Promise<User> {

		this.usersPolicies.passwordsMustBeTheSame(password, confirm_password);

		const user = await this.mysqlRepository.findOne(User, id);

		user.password = await this.bcryptHelper.hashString(password);

		return this.mysqlRepository.save(User, user);
	}

	public async update(id: string, user_payload: UpdateUserDTO): Promise<User> {

		const user = await this.mysqlRepository.findOne(User, id);

		this.usersPolicies.ensurePayloadHasDiferences(user_payload, user);

		user.name = user_payload.name;
		user.email = user_payload.email;
		user.type = user_payload.type;

		return this.mysqlRepository.save(User, user);
	}

}
