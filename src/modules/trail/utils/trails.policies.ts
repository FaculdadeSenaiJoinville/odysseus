import { Injectable } from '@nestjs/common';
import { AvailableTrail } from 'src/core/database/entities/available-trail.entity';
import { Trail } from '../../../core/database/entities';

@Injectable()
export class TrailsPolicies {
	
  public hasUserInTrail(user_id: string, availableTrails: AvailableTrail[]): boolean {

  
    return Boolean(availableTrails.some(availableTrail => availableTrail.entity_id === user_id));
  }

}
