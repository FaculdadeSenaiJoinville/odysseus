import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptHelper } from 'src/common/helpers';
import { Dictionary } from 'odyssey-dictionary';

@Injectable()
export class AuthPolicies {

	constructor(private readonly bcryptHelper: BcryptHelper) {}

	public async mustBeTheSamePassword(login_password: string, user_password: string): Promise<void> {

		const samePassword = await this.bcryptHelper.compareStringToHash(login_password, user_password);

		if (!samePassword) {

			throw new UnauthorizedException(Dictionary.auth.getMessage('user_not_found'));
		}
	}

}
