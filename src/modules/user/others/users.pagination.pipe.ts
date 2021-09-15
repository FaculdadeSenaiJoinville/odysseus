import { Injectable } from '@nestjs/common';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { IPagination, IPaginationPipe } from 'src/core/repositories/pagination/pagination.type';
import { PAGINATION_SCHEMA } from 'src/core/repositories/pagination/pagination.validation';

@Injectable()
export class UsersPaginationPipe implements IPaginationPipe {

    public readonly schema = PAGINATION_SCHEMA;

    public readonly sortOrderValues = [
    	'name',
    	'email'
    ];

    public transform(pagination: IPagination) {

    	return new PaginationPipe(this.schema, this.sortOrderValues).validateAndFormatSchema(pagination);
    }
}