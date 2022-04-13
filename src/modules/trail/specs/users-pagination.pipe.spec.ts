import { PaginationPipe } from '../../../core/repository/pagination';
import { TrailsPaginationPipe } from '../utils/trails-pagination.pipe';

jest.mock('../../../core/repository/pagination/pagination.pipe');

describe('TrailPaginationPipe test', () => {

	const usersPaginationPipe = new TrailsPaginationPipe();

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
