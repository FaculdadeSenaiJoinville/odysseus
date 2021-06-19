import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Dictionary } from 'odyssey-dictionary';

@Injectable()
export class BcryptHelper {

	public async hashString(value: string): Promise<string> {	

		return await bcrypt.hash(value, 10)
			.then(hash => hash)
			.catch(() => { throw new InternalServerErrorException(Dictionary.systemError.getMessage('internal_server_error')) });
	}

	public async compareStringToHash(normalValue: string, encryptedValue: string): Promise<boolean> {

		return await bcrypt.compare(normalValue, encryptedValue)
			.then(response => response)
			.catch(() => { throw new InternalServerErrorException(Dictionary.systemError.getMessage('internal_server_error')) });
	}

}
