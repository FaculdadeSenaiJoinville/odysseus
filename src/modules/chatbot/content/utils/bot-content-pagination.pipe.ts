import { Injectable } from '@nestjs/common';
import { PaginationPipe } from 'src/core/repository/pagination/pagination.pipe';
import { IPagination, IPaginationPipe, PAGINATION_SCHEMA } from '../../../../core/repository/pagination';

@Injectable()
export class BotContentPaginationPipe implements IPaginationPipe {

    public readonly schema = {
    	...PAGINATION_SCHEMA
    };

    public readonly sortOrderValues = [
    	'name'
    ];

    public transform(pagination: IPagination) {

    	return new PaginationPipe('bot_contents', this.schema, this.sortOrderValues).validateAndFormatSchema(pagination);
    }
}