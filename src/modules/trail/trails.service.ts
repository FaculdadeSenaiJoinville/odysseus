import { Injectable } from '@nestjs/common';
import { CreateTrailDTO } from './dtos/create-trail.dto';
import { BcryptHelper } from 'src/common/helpers';
import { UpdatePasswordDTO, UpdateTrailDTO } from './dtos';
import { TrailsPolicies } from './utils/trails.policies';
import { Dictionary } from 'odyssey-dictionary';
import { SuccessSaveMessage } from '../../common/types';
import { GroupHelper } from '../group/utils/group.helper';
import { GroupPolicies } from '../group/utils/group.policies';
import { MySQLRepositoryService } from '../../core/repository';
import { Group, Trail } from '../../core/database/entities';

@Injectable()
export class TrailsService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly bcryptHelper: BcryptHelper,
		private readonly trailsPolicies: TrailsPolicies,
		private readonly groupPolicies: GroupPolicies,
		private readonly groupHelper: GroupHelper
	) {}

	public async create(trail: CreateTrailDTO): Promise<SuccessSaveMessage> {
		const newTrail = new Trail();

		
		newTrail.name = trail.name;
		newTrail.description = trail.description;
		newTrail.icon = trail.icon;
		newTrail.status = 'PUBLISHED';
		newTrail.color = trail.color.substring(1);

		const createdTrail = await this.mysqlRepository.save(Trail, newTrail);

		return {
			message: Dictionary.trails.getMessage('successfully_created'),
			id: createdTrail.id
		};
	}

	public async updatePassword(id: string, { password, confirm_password }: UpdatePasswordDTO): Promise<SuccessSaveMessage> {

		const trail = await this.mysqlRepository.findOneOrFail(Trail, id);

		await this.mysqlRepository.save(Trail, trail);

		return {
			message: Dictionary.trails.getMessage('password_successfully_updated'),
			id
		};
	}

	public async update(id: string, trail_payload: UpdateTrailDTO): Promise<SuccessSaveMessage> {

		const trail = await this.mysqlRepository.findOneOrFail(Trail, id);
		const groups = trail_payload.groups;
		const groupsToLeave = trail_payload.groups_to_leave;

		trail.name = trail_payload.name;
		trail.active = trail_payload.active;

		await this.mysqlRepository.save(Trail, trail);

		return {
			id,
			message: Dictionary.trails.getMessage('successfully_updated')
		}
	}

}