import { BadRequestException, Injectable } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';

@Injectable()
export class UsersPolicies {

	public passwordsMustBeTheSame(first_password: string, second_password: string): void {

		if (first_password !== second_password) {

			throw new BadRequestException(Dictionary.users.getMessage('password_not_equal'));
		}
	}

	public mustHaveLastName(name: string) {

		const regex = /[ ]/g;

		if (!regex.test(name)) {

			throw new BadRequestException(Dictionary.users.getMessage('must_have_last_name'));
		}
	}

}
