import { Injectable } from '@nestjs/common';
import { Trail } from '../../../core/database/entities';

@Injectable()
export class TrailsPolicies {
	
    public hasUserInTrail(user_id: string, trail: Trail): boolean {
      return Boolean(trail.users.find(user => user.id === user_id));
    }

}
