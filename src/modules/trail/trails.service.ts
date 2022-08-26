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
import { getManager } from 'typeorm';
import { Type } from './utils/trailAccessType';

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
			relations: ['availableTrail'],
			where: { id }
		});

		const users = trail_payload.users;
		const usersToRemove = trail_payload.users_to_remove;

		const groupusers = trail_payload.groups;
		const groupusersToRemove = trail_payload.groups_to_remove;

		if (users) {
			
			for (const user of users) {

				if (trail && !this.trailsPolicies.hasUserInTrail(user.id, trail.availableTrail)) {
	
					this.saveTrailAccessEntity(trail.id, user.id, Type.USER);
				}
			}
		}

		if (usersToRemove) {

			for (const user of usersToRemove) {

				const trailWithUsers = await this.mysqlRepository.findOne(Trail, {
					where: { id }
				});

				if (trailWithUsers && this.trailsPolicies.hasUserInTrail(user.id, trail.availableTrail)) {
					await this.trailHelper.removeUserFromTrail(trail, user.id);
				}
			}
		}


		if (groupusers) {

			for (const group of groupusers) {

				const trailAccessUsers = await this.mysqlRepository.findOne(Trail, {
					where: { id }
				});

				if (trailAccessUsers && !this.trailsPolicies.hasUserInTrail(group.id, trail.availableTrail)) {
	
					this.saveTrailAccessEntity(trail.id, group.id, Type.GROUP);
				}
			}
		}

		if (groupusersToRemove) {

			for (const group of groupusersToRemove) {

				const trailWithUsers = await this.mysqlRepository.findOne(Trail, {
					where: { id }
				});

				if (trailWithUsers && this.trailsPolicies.hasUserInTrail(group.id, trail.availableTrail)) {
					await this.trailHelper.removeUserFromTrail(trail, group.id);
				}
			}
		}





		return {
			id,
			message: Dictionary.trails.getMessage('successfully_updated')
		}
	}

	private async saveTrailAccessEntity(trails_id: string, entity_id: string, type: Type){
	
		const payload = { trails_id, entity_id, type } as AvailableTrail;
		
		await this.trailHelper.addTrailEntity(payload);
	}

	private async deleteTrailAccessEntity(trails_id: string, entity_id: string, type: Type){
	
		const payload = { trails_id, entity_id, type } as AvailableTrail;
		
		await this.trailHelper.addTrailEntity(payload);
	}

	
	private async saveTrailAccessEntities(availableTrailList: AvailableTrail[]){
			
		for (let avTrail of availableTrailList)
		{
			await this.trailHelper.addTrailEntity(avTrail);
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