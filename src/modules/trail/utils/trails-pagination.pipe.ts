import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { PaginationPipe } from 'src/core/repository/pagination/pagination.pipe';
import { IPagination, IPaginationPipe, PAGINATION_SCHEMA } from '../../../core/repository/pagination';

@Injectable()
export class TrailsPaginationPipe implements IPaginationPipe {

    public readonly schema = {
    	...PAGINATION_SCHEMA,
    	type: Joi.string(),
    	active: Joi.boolean()
    };

    public readonly sortOrderValues = [
    	'name',
    	'email'
    ];

    public transform(pagination: IPagination) {

    	return new PaginationPipe('users', this.schema, this.sortOrderValues).validateAndFormatSchema(pagination);
    }
}