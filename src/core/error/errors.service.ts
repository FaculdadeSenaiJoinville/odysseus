import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { MySQLError } from './utils/error.types';

@Injectable()
export class ErrorService {

	public throwInternalServerError = (): never => {

		throw new InternalServerErrorException(Dictionary.errors.getMessage('internal_server_error'));
	}

	public throwMySQLError(error: MySQLError): never {

		if (error.errno === 1062) {

			const value = `"${error.sqlMessage.split(/'/)[1]}"`;

			error.sqlMessage = Dictionary.errors.getMessage('duplicate_entry', { value });
		}

		throw new BadRequestException(error.sqlMessage);
	}

}
