import { Body, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CREATE_USER_VALIDATION, UPDATE_PASSWORD_VALIDATION, UPDATE_USER_VALIDATION } from './others/users.validation';
import { User } from 'src/core/database/mysql/entities';
import { ValidateBodyPipe } from 'src/common/pipes';
import { ApiController, AuthProtection } from 'src/common/decorators';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dtos';
import { UsersRepository } from './others/users.repository';

@ApiController('users')
export class UsersController {

	constructor(
		private readonly userService: UsersService,
		private readonly userRepository: UsersRepository
	) {}

	@Get()
	@AuthProtection()
	public async list(): Promise<User[]> {

		return this.userRepository.list();
	}

	@Post('create')
	@AuthProtection()
	public async create(@Body(new ValidateBodyPipe(CREATE_USER_VALIDATION)) user: CreateUserDTO): Promise<User> {

		return this.userService.create(user);
	}

	@Put('update-password/:id')
	@AuthProtection()
	public async updatePassword(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_PASSWORD_VALIDATION)) password_payload: UpdatePasswordDTO): Promise<User> {

		return this.userService.updatePassword(id, password_payload);
	}

	@Post('update/:id')
	@AuthProtection()
	public async update(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_USER_VALIDATION)) user: UpdateUserDTO): Promise<User> {

		return this.userService.update(id, user);
	}

}
