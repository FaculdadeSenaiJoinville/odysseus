export const MOCKED_QUERY_BUILDER = {
	addGroupBy: jest.fn().mockReturnThis(),
	andWhere: jest.fn().mockReturnThis(),
	addSelect: jest.fn().mockReturnThis(),
	callListeners: jest.fn().mockReturnThis(),
	delete: jest.fn().mockReturnThis(),
	execute: jest.fn(),
	from: jest.fn().mockReturnThis(),
	getManyAndCount: jest.fn(),
	getMany: jest.fn().mockReturnThis(),
	getOne: jest.fn(),
	getRawMany: jest.fn(),
	innerJoinAndSelect: jest.fn().mockReturnThis(),
	innerJoin: jest.fn().mockReturnThis(),
	leftJoinAndSelect: jest.fn().mockReturnThis(),
	leftJoin: jest.fn().mockReturnThis(),
	limit: jest.fn().mockReturnThis(),
	orWhere: jest.fn().mockReturnThis(),
	addOrderBy: jest.fn().mockReturnThis(),
	select: jest.fn().mockReturnThis(),
	set: jest.fn().mockReturnThis(),
	subQuery: jest.fn().mockReturnThis(),
	update: jest.fn().mockReturnThis(),
	whereInIds: jest.fn().mockReturnThis(),
	where: jest.fn().mockReturnThis(),
	orderBy: jest.fn().mockReturnThis(),
	getRawOne: jest.fn().mockReturnThis(),
	getCount: jest.fn(),
	getOneOrFail: jest.fn(),
	groupBy: jest.fn().mockReturnThis(),
	offset: jest.fn().mockReturnThis(),
	having:  jest.fn().mockReturnThis()
};

export function generateMySqlRepositoryService() {

	const repository = {
		queryBuilder: MOCKED_QUERY_BUILDER,
		createQueryBuilder: jest.fn(),
		findAndCount: jest.fn(),
		find: jest.fn(),
		findByIds: jest.fn(),
		findOne: jest.fn(),
		findOneOrFail: jest.fn(),
		delete: jest.fn(),
		remove: jest.fn(),
		save: jest.fn(),
		update: jest.fn(),
		create: jest.fn(),
		count: jest.fn()
	};

	return {
		repository,
		get: jest.fn(() => repository as unknown),
		findOneOrFail: jest.fn(),
		findOne: jest.fn(),
		findAll: jest.fn(),
		save: jest.fn(),
		delete: jest.fn(),
		setFindOptions: jest.fn().mockReturnValue(MOCKED_QUERY_BUILDER)
	}
}
