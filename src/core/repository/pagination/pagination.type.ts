import { PipeTransform } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { GenericObject } from '../../../common/types';

export type Order = 'ASC' | 'DESC';

export interface IPagination {
    page?: number;
    perPage?: number;
    sortField?: string;
    sortOrder?: Order;
    like?: string;
}

export interface IPaginationPipe extends PipeTransform<IPagination, FindManyOptions> {
    schema: GenericObject;
    sortOrderValues: string[];
}