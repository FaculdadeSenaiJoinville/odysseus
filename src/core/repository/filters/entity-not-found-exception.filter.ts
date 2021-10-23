import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

@Catch(EntityNotFoundError, Error)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {

	public catch(exception: any, host: ArgumentsHost) {

		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		return response.status(exception.status).json({ message: exception.message });
	}

}