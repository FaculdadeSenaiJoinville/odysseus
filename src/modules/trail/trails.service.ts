import { Injectable } from '@nestjs/common';
import { BcryptHelper } from 'src/common/helpers';
import { UpdateTrailDTO, UpdateAccessTrailDTO, CreateTrailDTO } from './dtos';
import { TrailsPolicies } from './utils/trails.policies';
import { Dictionary } from 'odyssey-dictionary';
import { SuccessSaveMessage } from '../../common/types';
import { GroupHelper } from '../group/utils/group.helper';
import { TrailHelper } from '../trail/utils/trail.helper';
import { GroupPolicies } from '../group/utils/group.policies';
import { MySQLRepositoryService } from '../../core/repository';
import { Trail } from '../../core/database/entities';
import { AvailableTrail} from '../../core/database/entities/available-trail.entity';
import { TrailsType } from './utils/trails.type';

@Injectable()
export class TrailsService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly bcryptHelper: BcryptHelper,
		private readonly trailsPolicies: TrailsPolicies,
		private readonly groupPolicies: GroupPolicies,
		private readonly groupHelper: GroupHelper,
		private readonly trailHelper: TrailHelper
	) {}

	public async create(trail: CreateTrailDTO): Promise<SuccessSaveMessage> {
		const newTrail = new Trail();

		
		newTrail.name = trail.name;
		newTrail.description = trail.description;
		newTrail.icon = trail.icon;
		newTrail.status = TrailsType.ONEDIT;
		newTrail.color = trail.color.substring(1);

		const createdTrail = await this.mysqlRepository.save(Trail, newTrail);

		return {
			message: Dictionary.trails.getMessage('successfully_created'),
			id: createdTrail.id
		};
	}

	public async update(id: string, trail_payload: UpdateTrailDTO): Promise<SuccessSaveMessage> {

		const trail = await this.mysqlRepository.findOneOrFail(Trail, id);

		trail.name = trail_payload.name;
		trail.description = trail_payload.description;
		trail.icon = trail_payload.icon;
		trail.status = TrailsType.ONEDIT;
		trail.color = trail_payload.color.substring(1);
		trail.active = trail_payload.active;

		await this.mysqlRepository.save(Trail, trail);

		return {
			id,
			message: Dictionary.trails.getMessage('successfully_updated')
		}
	}

	public async updateAccess(id: string, trail_payload: UpdateAccessTrailDTO): Promise<SuccessSaveMessage> {
		const trail = await this.mysqlRepository.findOneOrFail(Trail, {
			relations: ['users'],
			where: { id }
		});
		trail.users = trail_payload.members;

		const members = trail_payload.members;
		const membersToRemove = trail_payload.members_to_remove;

		const groupMembers = trail_payload.groups;
		const groupMembersToRemove = trail_payload.groups_to_remove;


		const updatedGroup = await this.mysqlRepository.save(Trail, trail);

		if (members) {

			for (const user of members) {

				const trailAccessUsers = await this.mysqlRepository.findOne(Trail, {
					relations: ['users'],
					where: { id: user.id }
				});

				if (trailAccessUsers && !this.trailsPolicies.hasUserInTrail(user.id, trailAccessUsers)) {
	
					await this.trailHelper.addUserToTrail(updatedGroup.id, user.id);
				}
			}
		}

		if (membersToRemove) {

			for (const user of membersToRemove) {

				const trailWithUsers = await this.mysqlRepository.findOne(Trail, {
					relations: ['users'],
					where: { id: user.id }
				});

				if (trailWithUsers && this.trailsPolicies.hasUserInTrail(user.id, trailWithUsers)) {
					await this.trailHelper.removeUserFromTrail(updatedGroup.id, user.id);
				}
			}
		}
		return {
			id,
			message: Dictionary.trails.getMessage('successfully_updated')
		}
	}

	public async changeStatus(status: TrailsType,id: string): Promise<SuccessSaveMessage> {

		const trail = await this.mysqlRepository.findOneOrFail(Trail, id);

		trail.status = status;

		await this.mysqlRepository.save(Trail, trail);

		return {
			id,
			message: Dictionary.trails.getMessage('successfully_updated')
		}
	}

}