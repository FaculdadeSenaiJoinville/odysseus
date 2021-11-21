import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { BcryptHelper } from 'src/common/helpers';
import { UpdatePasswordDTO, UpdateUserDTO } from './dtos';
import { UsersPolicies } from './utils/users.policies';
import { Dictionary } from 'odyssey-dictionary';
import { SuccessSaveMessage } from '../../common/types';
import { GroupHelper } from '../group/utils/group.helper';
import { GroupPolicies } from '../group/utils/group.policies';
import { MySQLRepositoryService } from '../../core/repository';
import { Group, User } from '../../core/database/entities';

@Injectable()
export class UsersService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly bcryptHelper: BcryptHelper,
		private readonly usersPolicies: UsersPolicies,
		private readonly groupPolicies: GroupPolicies,
		private readonly groupHelper: GroupHelper
	) {}

	public async create(user: CreateUserDTO): Promise<SuccessSaveMessage> {

		this.usersPolicies.mustHaveLastName(user.name);
		this.usersPolicies.passwordsMustBeTheSame(user.password, user.confirm_password);

		const newUser = new User();
		const groups = user.groups;

		newUser.name = user.name;
		newUser.email = user.email;
		newUser.password = await this.bcryptHelper.hashString(user.password);
		newUser.type = user.type;

		const createdUser = await this.mysqlRepository.save(User, newUser);

		if (groups) {

			for (const group of groups) {

				const dbGroup = await this.mysqlRepository.findOne(Group, {
					relations: ['members'],
					where: { id: group.id }
				});
	
				if (dbGroup && !this.groupPolicies.hasUserInGroup(createdUser.id, dbGroup)) {
	
					await this.groupHelper.addUserToGroup(group.id, createdUser.id);
				}
			}
		}

		return {
			message: Dictionary.users.getMessage('successfully_created'),
			id: createdUser.id
		};
	}

	public async updatePassword(id: string, { password, confirm_password }: UpdatePasswordDTO): Promise<SuccessSaveMessage> {

		this.usersPolicies.passwordsMustBeTheSame(password, confirm_password);

		const user = await this.mysqlRepository.findOneOrFail(User, id);

		user.password = await this.bcryptHelper.hashString(password);

		await this.mysqlRepository.save(User, user);

		return {
			message: Dictionary.users.getMessage('password_successfully_updated'),
			id
		};
	}

	public async update(id: string, user_payload: UpdateUserDTO): Promise<SuccessSaveMessage> {

		const user = await this.mysqlRepository.findOneOrFail(User, id);
		const groups = user_payload.groups;
		const groupsToLeave = user_payload.groups_to_leave;

		user.name = user_payload.name;
		user.email = user_payload.email;
		user.type = user_payload.type;
		user.active = user_payload.active;

		await this.mysqlRepository.save(User, user);

		if (groups) {

			for (const group of groups) {

				const dbGroup = await this.mysqlRepository.findOne(Group, {
					relations: ['members'],
					where: { id: group.id }
				});
	
				if (dbGroup && !this.groupPolicies.hasUserInGroup(id, dbGroup)) {
	
					await this.groupHelper.addUserToGroup(group.id, id);
				}
			}
		}

		if (groupsToLeave) {

			for (const group of groupsToLeave) {

				const dbGroup = await this.mysqlRepository.findOne(Group, {
					relations: ['members'],
					where: { id: group.id }
				});
	
				if (this.groupPolicies.hasUserInGroup(id, dbGroup)) {
	
					await this.groupHelper.removeUserFromGroup(group.id, id);
				}
			}
		}

		return {
			id,
			message: Dictionary.users.getMessage('successfully_updated')
		}
	}

}