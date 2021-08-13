import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { UpdateUserDTO } from '../dtos';
import { User } from 'src/core/database/mysql/entities';

@Injectable()
export class UsersPolicies {

	public passwordsMustBeTheSame(first_password: string, second_password: string): void {

		if (first_password !== second_password) {

			throw new BadRequestException(Dictionary.users.getMessage('password_not_equal'));
		}
	}

	public  ensurePayloadHasDiferences(user_payload: UpdateUserDTO, user: User): void {

		if (!(user_payload.type !== user.type || user_payload.name !== user.name || user_payload.email !== user.email)) {

			throw new BadRequestException(Dictionary.users.getMessage('update_payload_must_have_diferences'));
	  	}
	}
  
	public mustHaveUser(user: User): void {
		
		if (!user) {

			throw new NotFoundException(Dictionary.users.getMessage('user_not_found'));
		}
	}

}
