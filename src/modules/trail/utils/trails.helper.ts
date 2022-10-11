import { Injectable } from '@nestjs/common';
import { type } from 'os';
import { GroupMember, Trail } from 'src/core/database/entities';
import { AvailableTrail } from 'src/core/database/entities/available-trail.entity';
import { MySQLRepositoryService } from 'src/core/repository';
import { DeleteResult } from 'typeorm';
import { TrailType } from './trailsAccessType';
import { AddedByType } from './trails.type';

@Injectable()
export class TrailHelper {

	constructor(private readonly mysqlRepository: MySQLRepositoryService) {}

	public addTrailEntity(availableTrail: AvailableTrail): Promise<AvailableTrail> {

		return this.mysqlRepository.save(AvailableTrail, availableTrail);
	}

	public removeUserFromTrail(trails: Trail, entity_id: string): Promise<DeleteResult> {

		return this.mysqlRepository.delete(AvailableTrail, { trails_id: trails.id, entity_id });
	}

	public removeFromTrail(trails: Trail, entity_id: string): Promise<DeleteResult> {

		return this.mysqlRepository.delete(AvailableTrail, { trails_id: trails.id, entity_id });
	}

	public addToTrail(trails_id: string, entity_id: string, type: TrailType): Promise<AvailableTrail> {

		return this.mysqlRepository.save(AvailableTrail, { trails_id, entity_id, type } as AvailableTrail);
	}

}
