import { Injectable } from '@nestjs/common';
import { DeleteResult, EntityTarget, FindConditions, FindManyOptions, FindOneOptions, getConnectionManager, Repository, SelectQueryBuilder } from 'typeorm';
import { ErrorsService } from '../../error/errors.service';
import { Order } from '../pagination/pagination.type';

@Injectable()
export class MySQLRepositoryService {

	constructor(private errorService: ErrorsService) {}

	public get<Entity>(target: EntityTarget<Entity>): Repository<Entity> {

		return getConnectionManager().get('mysqlConnection').getRepository(target);
	}

	public async findOne<Entity>(target: EntityTarget<Entity>, value?: string | FindOneOptions<Entity> | FindConditions<Entity>): Promise<Entity> {

		return this.get(target).findOneOrFail(value).catch(error => {

			this.errorService.throwMySQLError(error);
		});
	}

	public async findAll<Entity>(target: EntityTarget<Entity>, options?: FindManyOptions<Entity> | FindConditions<Entity>) {

		const [list, count] = await this.get(target).findAndCount(options).catch(error => {

			this.errorService.throwMySQLError(error);
		});

		return { list, count };
	}

	public async save<Entity>(target: EntityTarget<Entity>, value: Entity): Promise<Entity> {

		const payload = this.get(target).create(value);

		return this.get(target).save(payload).catch(error => {
			
			this.errorService.throwMySQLError(error);
		});
	}

	public async delete<Entity>(target: EntityTarget<Entity>, id: string): Promise<DeleteResult> {

		return this.get(target).delete(id).catch(error => {
			
			this.errorService.throwMySQLError(error);
		});
	}

	public setPaginationAndOrder<E>(queryBuilder: SelectQueryBuilder<E>, options: FindManyOptions<E>): SelectQueryBuilder<E> {

		const { skip, take, order } = options;

		queryBuilder.take(take).skip(skip);

		if (order) {

			for (const [ sortField, sortOrder ] of Object.entries(order as { [key: string]: 'ASC' | 'DESC' })) {

				const orderUpperCased: Order = sortOrder ? sortOrder.toUpperCase() as Order : 'ASC';

				if (sortField.includes('.')) {

					const formattedSortField = this.formatSortFieldFromRelation(sortField);

					return queryBuilder.addOrderBy(formattedSortField, orderUpperCased);
				}

				return this.addOrderInMainAlias(queryBuilder, sortField, orderUpperCased);
			}
		}

		return queryBuilder;
	}

	private formatSortFieldFromRelation(sortField: string) {

		const splittedSortField = sortField.split('.');
		const length = splittedSortField.length;

		if (splittedSortField.length > 2) {

			return `${splittedSortField[length - 2]}.${splittedSortField[length - 1]}`;
		}

		return sortField;
	}

	private addOrderInMainAlias<E>(queryBuilder: SelectQueryBuilder<E>, sortField: string, order: Order) {

		const { mainAlias } = queryBuilder.expressionMap;

		if (mainAlias) {

			const isSortFieldTypeJson = mainAlias.metadata.ownColumns.some(column => {

				return column.propertyName === sortField && column.type === 'json';
			});

			if (isSortFieldTypeJson) {

				return queryBuilder.addOrderBy(`${queryBuilder.alias}.${sortField}#>>'{}'`, order);
			}
		}

		return queryBuilder.addOrderBy(`${queryBuilder.alias}.${sortField}`, order);
	}
}
