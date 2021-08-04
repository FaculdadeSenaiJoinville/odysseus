import { User } from 'src/core/database/mysql/entities';
import { generateRepositoryService } from 'src/tests/generate-repository-service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UserType } from '../others/users.type';
import { UsersPolicies } from '../others/users.policies';
import { BadRequestException } from '@nestjs/common';
import { Dictionary } from 'odyssey-dictionary';
import { UsersRepository } from '../others/users.repository';
import { FindManyOptions } from 'typeorm';

const repositoryService = generateRepositoryService();
const bcryptHelper = {
	hashString: jest.fn()
};
const usersPolicies = new UsersPolicies();
const userService = new UsersService(
	repositoryService as any,
	bcryptHelper as any,
	usersPolicies
);
const userRepository = new UsersRepository(repositoryService as any); 
const userController = new UsersController(
	userService,
	userRepository
);

describe('Users', () => {

	describe('List', () => {

		it('should return a list of users', async () => {
			
			const expected = [new User(), new User()];
			const options: FindManyOptions = {
				select: [
					'id',
					'name',
					'email',
					'type',
					'active'
				]
			};

			repositoryService.findAll.mockResolvedValue(expected);

			await expect(userController.list()).resolves.toEqual(expected);

			expect(repositoryService.findAll).toBeCalledWith(User, options);
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
			const expected = new User();

			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			repositoryService.save.mockResolvedValue(new User());

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
			const expected = new User();

			repositoryService.findOne.mockResolvedValue(new User());
			bcryptHelper.hashString.mockResolvedValue('$dsjsdjkjaksasbbc2424');
			repositoryService.save.mockResolvedValue(new User());

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
	});

	describe('Update', () => {

		it('should receive a payload and return the updated user', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				type: UserType.ADMIN
			};
			const id = 's45as45a4ss5as1s2';
			const expected = new User();

			repositoryService.findOne.mockResolvedValue(new User());
			repositoryService.save.mockResolvedValue(new User());

			await expect(userController.update(id, input)).resolves.toEqual(expected);
		});

		it('should receive an invalid payload and return an error', async () => {
			
			const input = {
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				type: UserType.ADMIN
			};
			const id = 's45as45a4ss5as1s2';
			const expected = new BadRequestException(Dictionary.users.getMessage('update_payload_must_have_diferences'));

			repositoryService.findOne.mockResolvedValue({
				name: 'João da Silva Teste',
				email: 'joao.teste@gmail.com',
				type: UserType.ADMIN
			});


			await expect(userController.update(id, input)).rejects.toEqual(expected);
		});
	});
});
