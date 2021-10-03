import { BadRequestException, Injectable } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { Group } from '../../../core/database/entities';
import { UpsertGroupDTO } from '../dto/upsert-group.dto';

@Injectable()
export class GroupPolicies {

	public hasUserInGroup(user_id: string, group: Group): boolean {

		return Boolean(group.users.find(user => user.id === user_id));
	}

	public ensurePayloadHasDiferences(group_payload: UpsertGroupDTO, group: Group): void {

		if (!(group_payload.name !== group.name || group_payload.description !== group.description)) {

			throw new BadRequestException(Dictionary.groups.getMessage('update_payload_must_have_diferences'));
	  	}
	}

}
