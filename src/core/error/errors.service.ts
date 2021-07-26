import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { MongoError } from 'typeorm';
import { MySQLError } from '../database';

@Injectable()
export class ErrorsService {

	public throwInternalServerError = (): never => {

		throw new InternalServerErrorException(Dictionary.errors.getMessage('internal_server_error'));
	}

	public throwMySQLError(error: MySQLError): never {

		throw new BadRequestException(error.sqlMessage);
	}

	public throwMongoError(error: MongoError): never {
		
		throw new BadRequestException(error.message);
	}

}
