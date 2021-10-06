import { Injectable } from '@nestjs/common';
import { IPagination, IPaginationPipe, PaginationPipe, PAGINATION_SCHEMA } from '../../../core/repository/pagination';

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