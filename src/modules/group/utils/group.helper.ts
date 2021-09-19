import { Injectable } from '@nestjs/common';
import { GroupMember } from 'src/core/database/mysql/entities';
import { MySQLRepositoryService } from '../../../core/repositories';

@Injectable()
export class GroupHelper {

	constructor(private readonly mysqlRepository: MySQLRepositoryService) {}

	public addUserToGroup(group_id: string, user_id: string): Promise<GroupMember> {

		const payload = { group_id, user_id } as GroupMember;

		return this.mysqlRepository.save(GroupMember, payload);
	}

}
