import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { ListOptions } from '../../../common/types';
import { Group, GroupMember, User } from '../../../core/database/entities';
import { mockedMySQLRepository, mockedQueryBuilder } from '../../../tests/generate-repository-service';
import { GroupController } from '../group.controller';
import { GroupService } from '../group.service';
import { GroupHelper } from '../utils/group.helper';
import { GroupPolicies } from '../utils/group.policies';
import { GroupRepository } from '../utils/group.repository';

const groupService = new GroupService(
	mockedMySQLRepository as any,
	new GroupPolicies(),
	new GroupHelper(mockedMySQLRepository as any)
);
const groupController = new GroupController(
	groupService,
	new GroupRepository(mockedMySQLRepository as any)
);

describe('Groups', () => {

	describe('Details', () => {

		it('should receive an id and return details of a group', async () => {
			
			const input = 's45as45a4ss5as1s2';
			const expected = new Group();

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getOneOrFail.mockResolvedValue(expected);

			await expect(groupController.details(input)).resolves.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('groups');
			expect(mockedMySQLRepository.repository.queryBuilder.where).toBeCalledWith({ id: input });
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['groups.id', 'groups.name', 'groups.description', 'users.id', 'users.name', 'users.type']);
		});

		it('should receive an nonexistent id and return an error', async () => {

			const input = 's45as45a4ss5as1s2';
			const expected = new NotFoundException(Dictionary.users.getMessage('group_not_found'));

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getOneOrFail.mockRejectedValue(expected);

			await expect(groupController.details(input)).rejects.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('groups');
			expect(mockedMySQLRepository.repository.queryBuilder.where).toBeCalledWith({ id: input });
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['groups.id', 'groups.name', 'groups.description', 'users.id', 'users.name', 'users.type']);
		});
	});

	describe('List', () => {

		it('should return a list of groups', async () => {
			
			const options = {
				skip: 0,
				take: 20
			} as ListOptions<Group>;
			const expected = [[new Group(), new Group()], 2];

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getManyAndCount.mockResolvedValue(expected);

			await expect(groupController.list(options)).resolves.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('groups');
			expect(mockedMySQLRepository.setFindOptions).toBeCalledWith(mockedQueryBuilder, options);
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['groups.id', 'groups.name', 'groups.description']);
		});
	});

	describe('Create', () => {

		it('should receive an input and return a new group', () => {

			const input = {
				name: 'Grupo de Teste',
				description: 'Teste de função'
			};
			const createdGroup = {
				id: 'ssdsds5d45sd',
				...input
			}
			const expected = {
				id: createdGroup.id,
				message: Dictionary.groups.getMessage('successfully_created')
			};

			mockedMySQLRepository.save.mockResolvedValue(createdGroup);

			expect(groupController.create(input)).resolves.toEqual(expected);
		});

		it('should receive an input and return a new group (with users to insert)', () => {

			const input = {
				name: 'Grupo de Teste',
				description: 'Teste de função',
				members: [
					{ id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0' },
					{ id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9' },
					{ id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9' }
				] as User[]
			};
			const createdGroup = {
				id: 'ssdsds5d45sd',
				...input
			}
			const group1 = {
				...createdGroup,
				members: []
			};
			const group2 = {
				...createdGroup,
				members: [{
					id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0'
				}]
			};
			const group3 = {
				...createdGroup,
				members: [
					{ id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0' },
					{ id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9' }
				]
			};
			const expected = {
				id: createdGroup.id,
				message: Dictionary.groups.getMessage('successfully_created')
			};

			mockedMySQLRepository.save.mockResolvedValueOnce(createdGroup).mockResolvedValueOnce(new GroupMember()).mockResolvedValueOnce(new GroupMember());
			mockedMySQLRepository.findOne.mockResolvedValueOnce(group1).mockResolvedValueOnce(group2).mockResolvedValueOnce(group3);

			expect(groupController.create(input)).resolves.toEqual(expected);
		});
	});

	describe('Update', () => {
		
		it('should receive a payload and return the updated group id', () => {
			
			const input = {
				name: 'Nome Atualizado'
			};
			const id = 'ssdsds5d45sd';
			const updatedGroup = { id } as Group;
			const expected = {
				message: Dictionary.groups.getMessage('successfully_updated'),
				id
			};

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(new Group());
			mockedMySQLRepository.save.mockResolvedValueOnce(updatedGroup);

			expect(groupController.update(id, input)).resolves.toEqual(expected);
		});

		it('should receive a payload and return the updated group id (with users to insert and remove)', () => {
			
			const input = {
				name: 'Nome Atualizado',
				members: [
					{ id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0' },
					{ id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9' }
				] as User[],
				members_to_remove: [
					{ id: '675e4ed9-2758-4ba1-b596-e10fb81e2df0' },
					{ id: '875e4ej9-9858-4ba1-c506-e00fb81a6dj9' }
				] as User[]
			};
			const id = 'ssdsds5d45sd';
			const group1 = {
				id,
				members: [{
					id: '675e4ed9-2758-4ba1-b596-e00fb81e2df0'
				}]
			};
			const group2 = {
				id,
				members: [{
					id: '675e4ed9-2758-4ba1-b596-e10fb81e2df0'
				}]
			};
			const updatedGroup = { id } as Group;
			const expected = {
				message: Dictionary.groups.getMessage('successfully_updated'),
				id
			};

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(new Group());
			mockedMySQLRepository.save.mockResolvedValueOnce(updatedGroup);
			mockedMySQLRepository.findOne
				.mockResolvedValueOnce(group1)
				.mockResolvedValueOnce(group1)
				.mockResolvedValueOnce(group2)

			expect(groupController.update(id, input)).resolves.toEqual(expected);
		});

		it('should receive a payload with no diferences and return an error', () => {
			
			const input = {
				name: 'Nome Igual',
				description: 'Descrição igual'
			};
			const id = 'sdsd115sd14w';
			const databaseGroup = {
				id,
				...input
			};
			const expected = new BadRequestException(Dictionary.groups.getMessage('update_payload_must_have_diferences'));

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(databaseGroup);

			expect(groupController.update(id, input)).rejects.toEqual(expected);
		});
	});

	describe('Remove', () => {
		
		it('should receive an id and return a success message', () => {
			
			const input = 'sdsdsds5d4s5d4';
			const expected = {
				message: Dictionary.groups.getMessage('successfully_deleted')
			};

			mockedMySQLRepository.delete.mockResolvedValueOnce(new GroupMember()).mockResolvedValueOnce(new Group());

			expect(groupController.remove(input)).resolves.toEqual(expected);
		});
	});
});