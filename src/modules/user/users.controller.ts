import { Body, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CREATE_USER_VALIDATION, UPDATE_PASSWORD_VALIDATION } from './others/users.validation';
import { User } from 'src/core/database/mysql/entities';
import { ValidateBodyPipe } from 'src/common/pipes';
import { ApiController, AuthProtection } from 'src/common/decorators';
import { CreateUserDTO, UpdatePasswordDTO } from './dtos';
import { UsersRepository } from './others/users.repository';

@ApiController('users')
export class UsersController {

	constructor(
		private readonly userService: UsersService,
		private readonly userRepository: UsersRepository
	) {}

	@Get('/list')
	@AuthProtection()
	public async list(): Promise<User[]> {

		return this.userRepository.list();
	}

	@Get('details/:id')
	@AuthProtection()
	public async getOne(@Param('id') id: string): Promise<User> {

		return this.userRepository.getOne(id);
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

}
