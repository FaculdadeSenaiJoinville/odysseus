import { Injectable } from '@nestjs/common';
import { Group } from 'src/core/database/entities';


@Injectable()
export class GroupPolicies {

	public hasUserInGroup(user_id: string, group: Group): boolean {

		return Boolean(group.users.find(user => user.id === user_id));
	}

}
