import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { MySQLError } from '../database';
import { ErrorHelper } from './others/error.helper';

@Injectable()
export class ErrorService {

	constructor(private readonly errorHelper: ErrorHelper) {}

	public throwInternalServerError = (): never => {

		throw new InternalServerErrorException(Dictionary.errors.getMessage('internal_server_error'));
	}

	public throwMySQLError(error: MySQLError): never {
		
		throw new BadRequestException('MySQL Error');
	}

	public throwMongoError(error: MySQLError): never {
		
		throw new BadRequestException('MongoDB Error');
	}

}
