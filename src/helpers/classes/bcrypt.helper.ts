import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ErrorHelper } from '..';

@Injectable()
export class BcryptHelper {

	private readonly errorHelper = new ErrorHelper();

	public async hashString(value: string): Promise<string> {	

		return await bcrypt.hash(value, 10)
			.then(hash => hash)
			.catch(this.errorHelper.throwInternalServerError);
	}

	public async compareStringToHash(normalValue: string, encryptedValue: string): Promise<boolean> {

		return await bcrypt.compare(normalValue, encryptedValue)
			.then(response => response)
			.catch(this.errorHelper.throwInternalServerError);
	}

}
