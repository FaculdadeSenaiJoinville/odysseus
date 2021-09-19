
import { Body, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiController, AuthProtection } from 'src/common/decorators';
import { SuccessSaveMessage } from '../../common/types';
import { ValidateBodyPipe } from '../../common/pipes';
import { UpsertGroupDTO } from './dtos/upsert-group.dto';
import { CREATE_GROUP_VALIDATION } from './utils/group.validation';

@ApiController('groups')
export class GroupController {

	constructor(private readonly groupsService: GroupService) {}

	@Post('create')
	@AuthProtection()
	public create(@Body(new ValidateBodyPipe(CREATE_GROUP_VALIDATION)) group: UpsertGroupDTO): Promise<SuccessSaveMessage> {

		return this.groupsService.create(group);
	}

}
