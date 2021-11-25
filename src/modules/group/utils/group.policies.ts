import { BadRequestException, Injectable } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { Group } from '../../../core/database/entities';
import { UpsertGroupDTO } from '../dto/upsert-group.dto';

@Injectable()
export class GroupPolicies {

	public hasUserInGroup(user_id: string, group: Group): boolean {

		return Boolean(group.members.find(user => user.id === user_id));
	}

}
