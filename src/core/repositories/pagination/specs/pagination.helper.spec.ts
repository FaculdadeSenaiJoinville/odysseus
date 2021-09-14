import { paginate, sort } from "../pagination.helper";

describe('Pagination helper', () => {

	describe('paginate', () => {

		it('should return a correct options with not paginate', () => {

			expect(paginate()).toEqual({});
		});

		it('should return a correct options with pagination', () => {

			expect(paginate({} as any)).toEqual({
				skip: 0,
				take: 20
			});

			expect(paginate({
				page: 1,
				perPage: 20
			})).toEqual({
				skip: 0,
				take: 20
			});

			expect(paginate({
				page: 5,
				perPage: 20
			})).toEqual({
				skip: 80,
				take: 20
			});

			expect(paginate({
				page: 10,
				perPage: 10
			})).toEqual({
				skip: 90,
				take: 10
			});

			expect(paginate({
				page: 0,
				perPage: 20
			})).toEqual({
				skip: 0,
				take: 20
			});
		});
	});

	describe('sort', () => {

		it('should return a correct options with not paginate', () => {

			expect(paginate()).toEqual({});

			expect(sort({
				page: 1,
				perPage: 20,
				sortField: 'email'
			})).toEqual({
				email: 'ASC'
			});

			expect(sort({
				page: 1,
				perPage: 20,
				sortOrder: 'ASC'
			})).toEqual({});
		});

		it('should return correct options with sort pagination', () => {

			expect(sort({
				page: 1,
				perPage: 20,
				sortField: 'email',
				sortOrder: 'ASC'
			})).toEqual({
				email: 'ASC'
			});
		});

		it('should transform sortOrder to UPPERCASE #241', () => {

			expect(sort({
				page: 1,
				perPage: 20,
				sortField: 'email',
				sortOrder: 'desc'
			} as any)).toEqual({
				email: 'DESC'
			});
		});
	});
});