import { Injectable } from '@nestjs/common';
import { GroupMember, Trail } from 'src/core/database/entities';
import { AvailableTrail } from 'src/core/database/entities/available-trail.entity';
import { MySQLRepositoryService } from 'src/core/repository';
import { DeleteResult } from 'typeorm';
import { Type } from './trailAccessType';

@Injectable()
export class TrailHelper {

	constructor(private readonly mysqlRepository: MySQLRepositoryService) {}

	public addTrailEntity(availableTrail: AvailableTrail): Promise<AvailableTrail> {

		console.log(availableTrail);
		return this.mysqlRepository.save(AvailableTrail, availableTrail);

	}

	public removeUserFromTrail(trails: Trail, entity_id: string): Promise<DeleteResult> {

		return this.mysqlRepository.delete(AvailableTrail, { trails_id: trails.id, entity_id });
	}

}
