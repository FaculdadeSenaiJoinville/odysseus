
import { Injectable } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { BaseMessage, SuccessSaveMessage } from '../../common/types';
import { Trail, Group, GroupMember } from '../../core/database/entities';
import { MySQLRepositoryService } from '../../core/repository';
import { UpsertGroupDTO } from './dto/upsert-group.dto';
import { GroupHelper } from './utils/group.helper';
import { GroupPolicies } from './utils/group.policies';
import { Repository, EntityManager } from 'typeorm';
import { getManager } from "typeorm";
import { TrailsPolicies } from '../trail/utils/trails.policies';
import { TrailHelper } from '../trail/utils/trails.helper';
import { TrailType } from '../trail/utils/trailsAccessType';

@Injectable()
export class GroupService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly groupPolicies: GroupPolicies,
		private readonly groupHelper: GroupHelper,
		private readonly trailPolicies: TrailsPolicies,
		private readonly trailHelper: TrailHelper

	) {}

	public async create(payload: UpsertGroupDTO): Promise<SuccessSaveMessage> {

		const group = new Group(payload.name, payload.description);
		const groupMembers = payload.members;
		const groupTrails = payload.trails;

		const createdGroup = await this.mysqlRepository.save(Group, group);

		if (groupMembers) {

			for (const user of groupMembers) {

				const groupWithUsers = await this.mysqlRepository.findOne(Group, {
					relations: ['members'],
					where: { id: createdGroup.id }
				});

				if (groupWithUsers && !this.groupPolicies.hasUserInGroup(user.id, groupWithUsers)) {
	
					await this.groupHelper.addUserToGroup(createdGroup.id, user.id);
				}
			}
		}

		if (groupTrails) {

			for (const trail of groupTrails) {

				const groupWithTrails = await this.mysqlRepository.findOne(Group, {
					relations: ['trails'],
					where: { id: createdGroup.id }
				});

				if (groupWithTrails && !this.groupPolicies.hasTrailInGroup(trail.id, groupWithTrails)) {
	
					await this.trailHelper.addToTrail(trail.id, createdGroup.id, TrailType.GROUP);
				}
			}
		}

		return {
			message: Dictionary.groups.getMessage('successfully_created'),
			id: createdGroup.id
		};
	}

	public async update(id: string, group_payload: UpsertGroupDTO): Promise<SuccessSaveMessage> {

		const group = await this.mysqlRepository.findOneOrFail(Group, {
			relations: ['members'],
			where: { id }
		});
		const groupMembers = group_payload.members;
		const membersToRemove = group_payload.members_to_remove;

		group.name = group_payload.name;
		group.description = group_payload.description;
		
		const trails = group_payload.trails;
		const trailsToLeave = group_payload.trails_to_remove;

		const updatedGroup = await this.mysqlRepository.save(Group, group);

		if (groupMembers) {

			for (const user of groupMembers) {

				const groupWithUsers = await this.mysqlRepository.findOne(Group, {
					relations: ['members'],
					where: { id: group.id }
				});

				if (groupWithUsers && !this.groupPolicies.hasUserInGroup(user.id, groupWithUsers)) {
	
					await this.groupHelper.addUserToGroup(updatedGroup.id, user.id);
				}
			}
		}

		if (membersToRemove) {

			for (const user of membersToRemove) {

				const groupWithUsers = await this.mysqlRepository.findOne(Group, {
					relations: ['members'],
					where: { id: group.id }
				});

				if (groupWithUsers && this.groupPolicies.hasUserInGroup(user.id, groupWithUsers)) {

					await this.groupHelper.removeUserFromGroup(updatedGroup.id, user.id);
				}
			}
		}


		if (trails) {

			for (const trail of trails) {

				const groupWithTrails = await this.mysqlRepository.findOne(Group, {
					relations: ['trails'],
					where: { id: group.id }
				});
	
				if (groupWithTrails && !this.groupPolicies.hasTrailInGroup(id, groupWithTrails)) {
	
					await this.trailHelper.addToTrail(trail.id, id, TrailType.USER);
				}
			}
		}

		if (trailsToLeave) {

			for (const trailToLeave of trailsToLeave) {

				const dbTrailAccess = await this.mysqlRepository.findOne(Trail, {
					relations: ['groups'],
					where: { id: trailToLeave.id }
				});
				if (this.trailPolicies.hasTrailInGroup(id, dbTrailAccess)) {
	
					await this.trailHelper.removeUserFromTrail(trailToLeave, id);
				}
			}
		}


		return {
			message: Dictionary.groups.getMessage('successfully_updated'),
			id: updatedGroup.id
		};
	}

	public async remove(id: string): Promise<BaseMessage> {

		await this.mysqlRepository.delete(GroupMember, { group_id: id });
		await this.mysqlRepository.delete(Group, id);

		return {
			message:  Dictionary.groups.getMessage('successfully_deleted')
		};
	}

}
