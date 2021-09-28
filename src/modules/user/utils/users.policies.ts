import { BadRequestException, Injectable } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { UpdateUserDTO } from '../dtos';
import { User } from 'src/core/database/entities';

@Injectable()
export class UsersPolicies {

	public passwordsMustBeTheSame(first_password: string, second_password: string): void {

		if (first_password !== second_password) {

			throw new BadRequestException(Dictionary.users.getMessage('password_not_equal'));
		}
	}

	public  ensurePayloadHasDiferences(user_payload: UpdateUserDTO, user: User): void {

		if (!(user_payload.type !== user.type || user_payload.name !== user.name || user_payload.email !== user.email || user_payload.active !== user.active)) {

			throw new BadRequestException(Dictionary.users.getMessage('update_payload_must_have_diferences'));
	  	}
	}

}
