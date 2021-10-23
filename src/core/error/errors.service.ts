import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { MySQLError } from './utils/error.types';

@Injectable()
export class ErrorService {

	public throwInternalServerError = (): never => {

		throw new InternalServerErrorException(Dictionary.errors.getMessage('internal_server_error'));
	}

	public throwMySQLError(error: MySQLError): never {

		// tratar e traduzir a mensagem de erro do banco se for possível

		throw new BadRequestException(error.message);
	}

}
