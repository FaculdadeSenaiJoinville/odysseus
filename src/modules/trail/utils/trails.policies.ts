import { Injectable } from '@nestjs/common';
import { AvailableTrail } from 'src/core/database/entities/available-trail.entity';
import { Trail } from '../../../core/database/entities';

@Injectable()
export class TrailsPolicies {
	
  public hasUserInTrail(user_id: string, trails: Trail[]): boolean {

    return Boolean(trails.some(trail => trail.users.some(user => user.id === user_id)));
  }

  public hasTrailInUser(user_id: string, trail: Trail ): boolean {

    return Boolean(trail.users.some(user => user.id === user_id));
  }

  public hasTrailInGroup(group_id: string, trail: Trail ): boolean {

    return Boolean(trail.groups.some(group => group.id === group_id));
  }

}
