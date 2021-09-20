
import { Injectable } from '@nestjs/common';
import { BaseMessage, SuccessSaveMessage } from '../../common/types';
import { Group, GroupMember } from '../../core/database/mysql/entities';
import { MySQLRepositoryService } from '../../core/repositories';
import { UpsertGroupDTO } from './dtos/upsert-group.dto';
import { GroupHelper } from './utils/group.helper';
import { GroupPolicies } from './utils/group.policies';

@Injectable()
export class GroupService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly groupPolicies: GroupPolicies,
		private readonly groupHelper: GroupHelper
	) {}

	public async create(payload: UpsertGroupDTO): Promise<SuccessSaveMessage> {

		const group = new Group(payload.name, payload.description);
		const groupMembers = payload.members;

		const createdGroup = await this.mysqlRepository.save(Group, group);

		if (groupMembers) {

			for (const userId of groupMembers) {

				await this.groupHelper.addUserToGroup(createdGroup.id, userId);
			}
		}

		return {
			message: 'Grupo criado com sucesso!',
			id: createdGroup.id
		};
	}

	public async update(id: string, group_payload: UpsertGroupDTO): Promise<SuccessSaveMessage> {

		const group = await this.mysqlRepository.findOneOrFail(Group, {
			relations: ['users'],
			where: { id }
		});
		const groupMembers = group_payload.members;
		const membersToRemove = group_payload.members_to_remove;

		group.name = group_payload.name;
		group.description = group_payload.description;

		const updatedGroup = await this.mysqlRepository.save(Group, group);

		if (groupMembers) {

			for (const userId of groupMembers) {
	
				if (!this.groupPolicies.hasUserInGroup(userId, group)) {
	
					await this.groupHelper.addUserToGroup(updatedGroup.id, userId);
				}
			}
		}

		if (membersToRemove) {

			for (const userId of membersToRemove) {
	
				if (this.groupPolicies.hasUserInGroup(userId, group)) {
	
					await this.groupHelper.removeUserFromGroup(updatedGroup.id, userId);
				}
			}
		}

		return {
			message: 'Grupo editado com sucesso!',
			id: updatedGroup.id
		};
	}

	public async remove(id: string): Promise<BaseMessage> {

		await this.mysqlRepository.delete(GroupMember, { group_id: id });
		await this.mysqlRepository.delete(Group, id);

		return {
			message: 'Grupo excluído com sucesso!'
		};
	}

}
