import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { User } from 'src/core/database/mysql/entities';

@Injectable()
export class UsersPolicies {

	public passwordsMustBeTheSame(first_password: string, second_password: string): void {

		if (first_password !== second_password) {

			throw new BadRequestException(Dictionary.users.getMessage('password_not_equal'));
		}
	}

	public mustHasUser(user: User): void {
		
		if (!user) {
			throw new NotFoundException(Dictionary.users.getMessage('user_not_found'));
		}
	}

}
