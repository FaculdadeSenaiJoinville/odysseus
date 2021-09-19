
import { Injectable } from '@nestjs/common';
import { SuccessSaveMessage } from '../../common/types';
import { Group } from '../../core/database/mysql/entities';
import { MySQLRepositoryService } from '../../core/repositories';
import { UpsertGroupDTO } from './dtos/upsert-group.dto';
import { GroupHelper } from './utils/group.helper';

@Injectable()
export class GroupService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly groupHelper: GroupHelper
	) {}

	public async create(payload: UpsertGroupDTO): Promise<SuccessSaveMessage> {

		const group = new Group(payload.name, payload.description);
		const groupMembers = payload.members;

		const createdGroup = await this.mysqlRepository.save(Group, group);

		for (const userId of groupMembers) {

			await this.groupHelper.addUserToGroup(createdGroup.id, userId);
		}

		return {
			message: '',
			id: createdGroup.id
		};
	}

}
