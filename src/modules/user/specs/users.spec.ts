import { User } from 'src/core/database/entities';
import { mockedMySQLRepository, mockedQueryBuilder } from 'src/tests/generate-repository-service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UserType } from '../utils/users.type';
import { UsersPolicies } from '../utils/users.policies';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { UserStubs } from './stubs/user.stubs';
import { UsersRepository } from '../utils/users.repository';
import { UpdateUserDTO } from '../dtos';
import { GroupPolicies } from '../../group/utils/group.policies';
import { GroupHelper } from '../../group/utils/group.helper';
import { ListOptions } from '../../../common/types';

const usersRepository = new UsersRepository(mockedMySQLRepository as any);
const bcryptHelper = {
	hashString: jest.fn()
};
const usersPolicies = new UsersPolicies();
const userService = new UsersService(
	mockedMySQLRepository as any,
	bcryptHelper as any,
	usersPolicies,
	new GroupPolicies(),
	new GroupHelper(mockedMySQLRepository as any)
);
const userController = new UsersController(
	userService,
	usersRepository
);
const userStubs = new UserStubs();

describe('Users', () => {

	describe('Details', () => {

		it('should receive an id and return details of an user', async () => {
			
			const input = 's45as45a4ss5as1s2';
			const expected = new User();

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getOneOrFail.mockResolvedValue(expected);

			await expect(userController.details(input)).resolves.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('users');
			expect(mockedMySQLRepository.repository.queryBuilder.where).toBeCalledWith({ id: input });
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['users.id', 'users.name', 'users.email', 'users.type', 'users.active', 'groups.id', 'groups.name']);
		});

		it('should receive an nonexistent id and return an error', async () => {

			const input = 's45as45a4ss5as1s2';
			const expected = new NotFoundException(Dictionary.users.getMessage('user_not_found'));

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getOneOrFail.mockRejectedValue(expected);

			await expect(userController.details(input)).rejects.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('users');
			expect(mockedMySQLRepository.repository.queryBuilder.where).toBeCalledWith({ id: input });
			expect(mockedMySQLRepository.repository.queryBuilder.select).toBeCalledWith(['users.id', 'users.name', 'users.email', 'users.type', 'users.active', 'groups.id', 'groups.name']);
		});
	});

	describe('List', () => {

		it('should return a list of users', async () => {
			
			const options = {
				skip: 0,
				take: 20
			} as ListOptions<User>;
			const expected = [[new User(), new User()], 2];

			mockedMySQLRepository.repository.createQueryBuilder.mockReturnValue(mockedQueryBuilder)
			mockedMySQLRepository.repository.queryBuilder.getManyAndCount.mockResolvedValue(expected);

			await expect(userController.list(options)).resolves.toEqual(expected);

			expect(mockedMySQLRepository.repository.createQueryBuilder).toBeCalledWith('users');
			expect(mockedMySQLRepository.setFindOptions).toBeCalledWith(mockedQueryBuilder, options);
		});
	});

	describe('Create', () => {

		it('should receive an input and return a new user', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: 'João@123',
				confirm_password: 'João@123',
				type: UserType.ADMIN
			};
			const createdUser = {
				id: 's45as45a4ss5as1s2',
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: '$dsjsdjkjaksasbbc2424',
				type: UserType.ADMIN
			};
			const expected = {
				id: createdUser.id,
				message: Dictionary.users.getMessage('successfully_created')
			};

			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			mockedMySQLRepository.save.mockResolvedValue(createdUser);

			await expect(userController.create(input)).resolves.toEqual(expected);
		});

		it('should receive an invalid input and return an error', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				password: 'João@123',
				confirm_password: 'João@12345',
				type: UserType.ADMIN
			};
			const expected = new BadRequestException(Dictionary.users.getMessage('password_not_equal'));

			await expect(userController.create(input)).rejects.toEqual(expected);
		});
	});

	describe('UpdatePassword', () => {

		it('should receive an input and return a new user', async () => {
			
			const input = {
				password: 'João@123',
				confirm_password: 'João@123'
			};
			const id = 's45as45a4ss5as1s2';
			const user = {
				id,
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				type: UserType.ADMIN
			}
			const expected = {
				id,
				message: Dictionary.users.getMessage('password_successfully_updated')
			};

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(user);
			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			mockedMySQLRepository.save.mockResolvedValue(new User());

			await expect(userController.updatePassword(id, input)).resolves.toEqual(expected);
		});

		it('should receive an invalid input and return an error', async () => {
			
			const input = {
				password: 'João@123',
				confirm_password: 'João@1234'
			};
			const id = 's45as45a4ss5as1s2';
			const expected = new BadRequestException(Dictionary.users.getMessage('password_not_equal'));

			await expect(userController.updatePassword(id, input)).rejects.toEqual(expected);
		});

		it('should receive an nonexistent id and return an error', async () => {
			
			const input = {
				password: 'João@1234',
				confirm_password: 'João@1234'
			};
			const id = 's45as45a4ss5as1s2';
			const expected = new NotFoundException(Dictionary.users.getMessage('user_not_found'));

			mockedMySQLRepository.findOneOrFail.mockRejectedValue(expected);

			await expect(userController.updatePassword(id, input)).rejects.toEqual(expected);
		});
	});

	describe('ChangeStatus', () => {

		it('should cahnge user status and return the updated user', async () => {

			const activeUser = await userStubs.getUserStub(true, UserType.ADMIN);
			const disabledUser = await userStubs.getUserStub(false, UserType.ADMIN);
			const id = 's45as45a4ss5as1s2';
			const expected = {
				id,
				message: Dictionary.users.getMessage('status_successfully_updated')
			};

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(activeUser);
			mockedMySQLRepository.save.mockResolvedValue(disabledUser);

			await expect(userController.updateStatus(id)).resolves.toEqual(expected);

			expect(mockedMySQLRepository.findOneOrFail).toBeCalledWith(User, id);
			expect(mockedMySQLRepository.save).toBeCalledWith(User, disabledUser);
		});
	});

	describe('Update', () => {

		it('should receive a payload and return the updated user', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				type: UserType.ADMIN
			} as UpdateUserDTO;
			const id = 's45as45a4ss5as1s2';
			const expected = {
				id,
				message: Dictionary.users.getMessage('successfully_updated')
			};

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(new User());
			mockedMySQLRepository.save.mockResolvedValue(new User());

			await expect(userController.update(id, input)).resolves.toEqual(expected);
			
			expect(mockedMySQLRepository.findOneOrFail).toBeCalledWith(User, id);
			expect(mockedMySQLRepository.save).toBeCalledWith(User, input);
		});

		it('should receive an invalid payload and return an error', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				type: UserType.ADMIN
			} as UpdateUserDTO;
			const id = 's45as45a4ss5as1s2';
			const expected = new BadRequestException(Dictionary.users.getMessage('update_payload_must_have_diferences'));

			mockedMySQLRepository.findOneOrFail.mockResolvedValue(input);

			await expect(userController.update(id, input)).rejects.toEqual(expected);
			
			expect(mockedMySQLRepository.findOneOrFail).toBeCalledWith(User, id);
		});
	});
});
