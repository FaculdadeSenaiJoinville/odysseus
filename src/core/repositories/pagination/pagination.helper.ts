import { IPagination } from './pagination.type';

export function paginate(pagination?: IPagination) {

	if (pagination) {

		const { page = 1, perPage = 20 } = pagination;

		return {
			skip: [0, 1].includes(page) ? 0 : (page - 1) * perPage,
			take: perPage
		};
	}

	return {};
}

export function sort(pagination?: IPagination) {

	const order = {};

	if (pagination && pagination.sortField) {

		const { sortField, sortOrder } = pagination;

		order[sortField] = sortOrder ? sortOrder.toUpperCase() : 'ASC';
	}

	return order;
}