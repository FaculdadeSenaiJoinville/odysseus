import { PaginationPipe } from '../../../core/repository/pagination';
import { UsersPaginationPipe } from '../utils/users.pagination.pipe';

jest.mock('../../../core/repository/pagination/pagination.pipe');

describe('UserPaginationPipe test', () => {

	const usersPaginationPipe = new UsersPaginationPipe();

	it('should call for validateAndFormatSchema from PaginationPipe', () => {

		const pagination = {
			sortField: 'name',
			sortOrder: 'DESC',
			page: '1',
			perPage: '5'
		};

		usersPaginationPipe.transform(pagination as any);

		expect(PaginationPipe.prototype.validateAndFormatSchema).toHaveBeenCalledWith(pagination);
	});
});
