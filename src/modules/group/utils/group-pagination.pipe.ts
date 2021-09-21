import { Injectable } from '@nestjs/common';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { IPagination, IPaginationPipe } from 'src/core/repositories/pagination/pagination.type';
import { PAGINATION_SCHEMA } from 'src/core/repositories/pagination/pagination.validation';

@Injectable()
export class GroupPaginationPipe implements IPaginationPipe {

    public readonly schema = PAGINATION_SCHEMA;

    public readonly sortOrderValues = [
    	'name'
    ];

    public transform(pagination: IPagination) {

    	return new PaginationPipe('groups', this.schema, this.sortOrderValues).validateAndFormatSchema(pagination);
    }

}