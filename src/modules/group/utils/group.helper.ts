import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { GroupMember } from '../../../core/database/entities';
import { MySQLRepositoryService } from '../../../core/repository';

@Injectable()
export class GroupHelper {

	constructor(private readonly mysqlRepository: MySQLRepositoryService) {}

	public addUserToGroup(group_id: string, user_id: string): Promise<GroupMember> {

		const payload = { group_id, user_id } as GroupMember;

		return this.mysqlRepository.save(GroupMember, payload);
	}

	public removeUserFromGroup(group_id: string, user_id: string): Promise<DeleteResult> {

		return this.mysqlRepository.delete(GroupMember, { group_id, user_id });
	}

}
