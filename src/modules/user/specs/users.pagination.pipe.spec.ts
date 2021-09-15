import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UsersPaginationPipe } from '../others/users.pagination.pipe';

jest.mock('../../../common/pipes/pagination.pipe');

describe('ImportMapPaginationPipe test', () => {

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