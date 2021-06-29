export function generateRepositoryService() {

	const repository = {
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
		createQueryBuilder: jest.fn(),
		count: jest.fn()
	};

	return {
		get: () => repository,
		...repository
	}
}
