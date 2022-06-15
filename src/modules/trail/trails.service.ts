import { Injectable } from '@nestjs/common';
import { BcryptHelper } from 'src/common/helpers';
import { UpdateTrailDTO, CreateTrailDTO } from './dtos';
import { TrailsPolicies } from './utils/trails.policies';
import { Dictionary } from 'odyssey-dictionary';
import { SuccessSaveMessage } from '../../common/types';
import { GroupHelper } from '../group/utils/group.helper';
import { GroupPolicies } from '../group/utils/group.policies';
import { MySQLRepositoryService } from '../../core/repository';
import { Trail } from '../../core/database/entities';
import { TrailsType } from './utils/trails.type';

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