import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';
import { BcryptHelper } from 'src/common/helpers';
import { MySQLRepositoryService } from 'src/core/repositories';
import { UpdatePasswordDTO, UpdateUserDTO } from './dtos';
import { UsersPolicies } from './others/users.policies';
import { Dictionary } from 'odyssey-dictionary';
import { SuccessSaveMessage } from '../../common/types';

@Injectable()
export class UsersService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly bcryptHelper: BcryptHelper,
		private readonly usersPolicies: UsersPolicies
	) {}

	public async create(user: CreateUserDTO): Promise<SuccessSaveMessage> {

		this.usersPolicies.passwordsMustBeTheSame(user.password, user.confirm_password);

		const newUser = new User();

		newUser.name = user.name;
		newUser.email = user.email;
		newUser.password = await this.bcryptHelper.hashString(user.password);
		newUser.type = user.type;

		const createdUser = await this.mysqlRepository.save(User, newUser);

		return {
			message: Dictionary.users.getMessage('successfully_created'),
			id: createdUser.id
		};
	}

	public async updatePassword(id: string, { password, confirm_password }: UpdatePasswordDTO): Promise<SuccessSaveMessage> {

		this.usersPolicies.passwordsMustBeTheSame(password, confirm_password);

		const user = await this.mysqlRepository.findOne(User, id);

		this.usersPolicies.mustHaveUser(user);

		user.password = await this.bcryptHelper.hashString(password);

		await this.mysqlRepository.save(User, user);

		return {
			message: Dictionary.users.getMessage('password_successfully_updated'),
			id
		};
	}

	public async updateStatus(id: string): Promise<SuccessSaveMessage> {

		const user = await this.mysqlRepository.findOne(User, id);

		user.active = !user.active;

		await this.mysqlRepository.save(User, user);

		return {
			message: Dictionary.users.getMessage('status_successfully_updated'),
			id
		};
	}
	public async update(id: string, user_payload: UpdateUserDTO): Promise<SuccessSaveMessage> {

		const user = await this.mysqlRepository.findOne(User, id);

		this.usersPolicies.ensurePayloadHasDiferences(user_payload, user);

		user.name = user_payload.name;
		user.email = user_payload.email;
		user.type = user_payload.type;

		await this.mysqlRepository.save(User, user);

		return {
			id,
			message: Dictionary.users.getMessage('successfully_updated')
		}
	}

}
