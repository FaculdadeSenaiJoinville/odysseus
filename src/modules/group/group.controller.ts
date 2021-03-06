
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { AdminProfessorProtection, ApiController, AuthProtection } from 'src/common/decorators';
import { BaseMessage, ListOptions, SuccessSaveMessage } from '../../common/types';
import { ValidateBodyPipe } from '../../common/pipes';
import { UpsertGroupDTO } from './dto/upsert-group.dto';
import { UPSERT_GROUP_VALIDATION } from './utils/group.validation';
import { GroupRepository } from './utils/group.repository';
import { GroupPaginationPipe } from './utils/group-pagination.pipe';
import { Group } from 'src/core/database/entities';

@ApiController('groups')
export class GroupController {

	constructor(
		private readonly groupService: GroupService,
		private readonly groupRepository: GroupRepository
	) {}

	@Get('/list')
	@AuthProtection()
	public list(@Query(new GroupPaginationPipe()) options: ListOptions<Group>): Promise<[Group[], number]> {

		return this.groupRepository.list(options);
	}

	@Get('details/:id')
	@AuthProtection()
	public details(@Param('id') id: string): Promise<Group> {

		return this.groupRepository.details(id);
	}

	@Post('create')
	@AuthProtection()
	@AdminProfessorProtection()
	public create(@Body(new ValidateBodyPipe(UPSERT_GROUP_VALIDATION)) group: UpsertGroupDTO): Promise<SuccessSaveMessage> {

		return this.groupService.create(group);
	}

	@Put('update/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public update(@Param('id') id: string, @Body(new ValidateBodyPipe(UPSERT_GROUP_VALIDATION)) group: UpsertGroupDTO): Promise<SuccessSaveMessage> {

		return this.groupService.update(id, group);
	}

	@Delete('remove/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public remove(@Param('id') id: string): Promise<BaseMessage> {

		return this.groupService.remove(id);
	}

}
