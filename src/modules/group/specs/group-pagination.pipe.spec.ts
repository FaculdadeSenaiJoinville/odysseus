import { PaginationPipe } from '../../../core/repository/pagination';
import { GroupPaginationPipe } from '../utils/group-pagination.pipe';

jest.mock('../../../core/repository/pagination/pagination.pipe');

describe('GroupPaginationPipe test', () => {

	const groupPaginationPipe = new GroupPaginationPipe();

	it('should call for validateAndFormatSchema from PaginationPipe', () => {

		const pagination = {
			sortField: 'name',
			sortOrder: 'DESC',
			page: '1',
			perPage: '5'
		};

		groupPaginationPipe.transform(pagination as any);

		expect(PaginationPipe.prototype.validateAndFormatSchema).toHaveBeenCalledWith(pagination);
	});
});
