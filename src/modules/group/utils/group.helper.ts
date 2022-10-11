import { Injectable } from '@nestjs/common';
import { GroupMember } from 'src/core/database/entities';
import { AvailableTrail } from 'src/core/database/entities/available-trail.entity';
import { MySQLRepositoryService } from 'src/core/repository';
import { TrailType } from 'src/modules/trail/utils/trailsAccessType';
import { DeleteResult } from 'typeorm';

@Injectable()
export class GroupHelper {

	constructor(private readonly mysqlRepository: MySQLRepositoryService) {}

	public addUserToGroup(group_id: string, user_id: string): Promise<GroupMember> {

		const payload = { group_id, user_id } as GroupMember;

		return this.mysqlRepository.save(GroupMember, payload);
	}

	public addTrailToGroup(entity_id: string, trails_id: string): Promise<AvailableTrail> {

		const payload = { entity_id, trails_id, type: TrailType.GROUP  } as AvailableTrail;

		return this.mysqlRepository.save(AvailableTrail, payload);
	}

	public removeUserFromGroup(group_id: string, user_id: string): Promise<DeleteResult> {

		return this.mysqlRepository.delete(GroupMember, { group_id, user_id });
	}

}
