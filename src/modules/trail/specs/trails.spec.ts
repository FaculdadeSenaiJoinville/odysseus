import { Group, Trail, User } from 'src/core/database/entities';
import { mockedMySQLRepository, mockedQueryBuilder } from 'src/tests/generate-repository-service';
import { TrailsController } from '../trails.controller';
import { TrailsService } from '../trails.service';
import { TrailsPolicies } from '../utils/trails.policies';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { TrailsRepository } from '../utils/trails.repository';
import { UpdateTrailDTO } from '../dtos';
import { GroupPolicies } from '../../group/utils/group.policies';
import { GroupHelper } from '../../group/utils/group.helper';
import { ListOptions } from '../../../common/types';
import { session } from '../../../core/session';

const trailsRepository = new TrailsRepository(mockedMySQLRepository as any);
const bcryptHelper = {
	hashString: jest.fn()
};
const trailsPolicies = new TrailsPolicies();
const trailService = new TrailsService(
	mockedMySQLRepository as any,
	bcryptHelper as any,
	trailsPolicies,
	new GroupPolicies(),
	new GroupHelper(mockedMySQLRepository as any)
);
const trailController = new TrailsController(
	trailService,
	trailsRepository
);

describe('Trails', () => {

	describe('Details', () => {

		it('should receive an id and return details of an trail', async () => {
			
			const input = 's45as45a4ss5as1s2';
			const expected = new Trail();

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getOneOrFail.mockResolvedValue(expected);

			await expect(trailController.details(input)).resolves.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('trails');
			expect(mockedMySQLRepository.repository.queryBuilder.where).toBeCalledWith({ id: input });
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['trails.id', 'trails.name', 'trails.email', 'trails.type', 'trails.active', 'groups.id', 'groups.name']);
		});

		it('should receive an nonexistent id and return an error', async () => {

			const input = 's45as45a4ss5as1s2';
			const expected = new NotFoundException(Dictionary.trails.getMessage('trail_not_found'));

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getOneOrFail.mockRejectedValue(expected);

			await expect(trailController.details(input)).rejects.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('trails');
			expect(mockedMySQLRepository.repository.queryBuilder.where).toBeCalledWith({ id: input });
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['trails.id', 'trails.name', 'trails.email', 'trails.type', 'trails.active', 'groups.id', 'groups.name']);
		});
	});

	describe('Profile', () => {

		it('should receive an id and return the profile data of an trail', async () => {
			
			const loggedTrail = {
				id: 's45as45a4ss5as1s2'
			};
			const expected = new User();

			session.setUser(loggedTrail as User);

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getOneOrFail.mockResolvedValue(expected);

			await expect(trailController.profile()).resolves.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('trails');
			expect(mockedMySQLRepository.repository.queryBuilder.where).toBeCalledWith({ id: loggedTrail.id });
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['trails.id', 'trails.name', 'trails.description']);
		});

		it('should receive an nonexistent id and return an error', async () => {

			const input = 's45as45a4ss5as1s2';
			const expected = new NotFoundException(Dictionary.trails.getMessage('trail_not_found'));

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getOneOrFail.mockRejectedValue(expected);

			await expect(trailController.details(input)).rejects.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('trails');
			expect(mockedMySQLRepository.repository.queryBuilder.where).toBeCalledWith({ id: input });
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['trails.id', 'trails.name', 'trails.description']);
		});
	});

	describe('List', () => {

		it('should return a list of trails', async () => {
			
			const options = {
				skip: 0,
				take: 20
			} as ListOptions<Trail>;
			const expected = [[new Trail(), new Trail()], 2];

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getManyAndCount.mockResolvedValue(expected);

			await expect(trailController.list(options)).resolves.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('trails');
			expect(mockedMySQLRepository.setFindOptions).toBeCalledWith(mockedQueryBuilder, options);
		});
	});

	describe('Create', () => {

		it('should receive an input and return a new trail', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: 'João@123',
				confirm_password: 'João@123'
			};
			const createdTrail = {
				id: 's45as45a4ss5as1s2',
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: '$dsjsdjkjaksasbbc2424'
			};
			const expected = {
				id: createdTrail.id,
				message: Dictionary.trails.getMessage('successfully_created')
			};

			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			mockedMySQLRepository.save.mockResolvedValue(createdTrail);

			await expect(trailController.create(input)).resolves.toEqual(expected);
		});

		it('should receive an input and return a new trail (with trails to insert)', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: 'João@123',
				confirm_password: 'João@123',
				groups: [
					{ id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0' },
					{ id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9' }
				] as Group[]
			};
			const createdTrail = {
				id: 's45as45a4ss5as1s2',
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: '$dsjsdjkjaksasbbc2424',
			};
			const groupToInsert1 = {
				id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0',
				name: 'Grupo de Teste 1',
				description: 'Teste de função',
				members: []
			} as Group;
			const groupToInsert2 = {
				id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0',
				name: 'Grupo de Teste 2',
				description: 'Teste de função',
				members: []
			} as Group;
			const groupToInsert3 = {
				id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0',
				name: 'Grupo de Teste 3',
				description: 'Teste de função',
				members: [{
					id: 's45as45a4ss5as1s2'
				}]
			} as Group;
			const expected = {
				id: createdTrail.id,
				message: Dictionary.trails.getMessage('successfully_created')
			};

			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			mockedMySQLRepository.save.mockResolvedValue(createdTrail);
			mockedMySQLRepository.findOne.mockResolvedValueOnce(groupToInsert1).mockResolvedValueOnce(groupToInsert2).mockResolvedValueOnce(groupToInsert3);

			await expect(trailController.create(input)).resolves.toEqual(expected);
		});

		it('should receive an invalid input and return an error', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: 'João@123',
				confirm_password: 'João@12345'
			};
			const expected = new BadRequestException(Dictionary.trails.getMessage('password_not_equal'));

			await expect(trailController.create(input)).rejects.toEqual(expected);
		});
	});

	describe('UpdatePassword', () => {

		it('should receive an input and return a new trail', async () => {
			
			const input = {
				password: 'João@123',
				confirm_password: 'João@123'
			};
			const id = 's45as45a4ss5as1s2';
			const trail = {
				id,
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com'
			}
			const expected = {
				id,
				message: Dictionary.trails.getMessage('password_successfully_updated')
			};

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(trail);
			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			mockedMySQLRepository.save.mockResolvedValue(new Trail());

			await expect(trailController.updatePassword(id, input)).resolves.toEqual(expected);
		});

		it('should receive an invalid input and return an error', async () => {
			
			const input = {
				password: 'João@123',
				confirm_password: 'João@1234'
			};
			const id = 's45as45a4ss5as1s2';
			const expected = new BadRequestException(Dictionary.trails.getMessage('password_not_equal'));

			await expect(trailController.updatePassword(id, input)).rejects.toEqual(expected);
		});

		it('should receive an nonexistent id and return an error', async () => {
			
			const input = {
				password: 'João@1234',
				confirm_password: 'João@1234'
			};
			const id = 's45as45a4ss5as1s2';
			const expected = new NotFoundException(Dictionary.trails.getMessage('trail_not_found'));

			mockedMySQLRepository.findOneOrFail.mockRejectedValue(expected);

			await expect(trailController.updatePassword(id, input)).rejects.toEqual(expected);
		});
	});

	describe('Update', () => {

		it('should receive a payload and return the updated trail', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				active: false
			};
			const id = 's45as45a4ss5as1s2';
			const expected = {
				id,
				message: Dictionary.trails.getMessage('successfully_updated')
			};

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(new Trail());
			mockedMySQLRepository.save.mockResolvedValue(new Trail());

			await expect(trailController.update(id, input)).resolves.toEqual(expected);
			
			expect(mockedMySQLRepository.findOneOrFail).toBeCalledWith(Trail, id);
		});

		it('should receive a payload and return the updated trail (with group to insert and group to leave)', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				groups: [
					{ id: '675e4ed9-2758-4ba1-b596-e00fb81e2dv9' },
					{ id: '875e4ej9-9858-4ba1-d606-e00fb81a6dj9' }
				],
				groups_to_leave: [
					{ id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0' },
					{ id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9' }
				] as Group[]
			} as UpdateTrailDTO;
			const id = 's45as45a4ss5as1s2';
			const groupToInsert1 = {
				id: '675e4ed9-2758-4ba1-b596-e00fb81e2dv9',
				name: 'Grupo de Teste 1',
				description: 'Teste de função',
				members: []
			} as Group;
			const groupToInsert2 = {
				id: '875e4ej9-9858-4ba1-d606-e00fb81a6dj9',
				name: 'Grupo de Teste 2',
				description: 'Teste de função',
				members: [{
					id: 's45as45a4ss5as1s2'
				}]
			} as Group;
			const groupToLeave1 = {
				id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0',
				name: 'Grupo de Teste 3',
				description: 'Teste de função',
				members: [{
					id: 's45as45a4ss5as1s2'
				}]
			} as Group;
			const groupToLeave2 = {
				id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9',
				name: 'Grupo de Teste 4',
				description: 'Teste de função',
				members: []
			} as Group;
			const expected = {
				id,
				message: Dictionary.trails.getMessage('successfully_updated')
			};

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(new Trail());
			mockedMySQLRepository.save.mockResolvedValue(new Trail());
			mockedMySQLRepository.findOne
				.mockResolvedValueOnce(groupToInsert1)
				.mockResolvedValueOnce(groupToInsert2)
				.mockResolvedValueOnce(groupToLeave1)
				.mockResolvedValueOnce(groupToLeave2);

			await expect(trailController.update(id, input)).resolves.toEqual(expected);
			
			expect(mockedMySQLRepository.findOneOrFail).toBeCalledWith(Trail, id);
		});

		it('should receive an invalid payload and return an error', async () => {
			
			const input = {
				name: 'João',
				email: 'joao.teste@gmail.com',
				active: false
			};
			const id = 's45as45a4ss5as1s2';
			const expected = new BadRequestException(Dictionary.trails.getMessage('must_have_last_name'));

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(input);

			await expect(trailController.update(id, input)).rejects.toEqual(expected);
			
			expect(mockedMySQLRepository.findOneOrFail).toBeCalledWith(Trail, id);
		});
	});
});
