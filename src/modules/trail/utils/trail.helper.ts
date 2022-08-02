import { Injectable } from '@nestjs/common';
import { GroupMember } from 'src/core/database/entities';
import { AvailableTrail } from 'src/core/database/entities/available-trail.entity';
import { MySQLRepositoryService } from 'src/core/repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TrailHelper {

	constructor(private readonly mysqlRepository: MySQLRepositoryService) {}

	public addUserToTrail(trail_id: string, user_id: string): Promise<AvailableTrail> {

		const payload = { trail_id, user_id } as AvailableTrail;

		return this.mysqlRepository.save(AvailableTrail, payload);
	}

	public removeUserFromTrail(trail_id: string, user_id: string): Promise<DeleteResult> {

		return this.mysqlRepository.delete(AvailableTrail, { trail_id, user_id });
	}

}
