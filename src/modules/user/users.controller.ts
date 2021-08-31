import { Body, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CREATE_USER_VALIDATION, UPDATE_PASSWORD_VALIDATION, UPDATE_USER_VALIDATION } from './others/users.validation';
import { User } from 'src/core/database/mysql/entities';
import { ValidateBodyPipe } from 'src/common/pipes';
import { ApiController, AuthProtection } from 'src/common/decorators';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dtos';
import { SuccessSaveMessage } from '../../common/types';
import { FindManyOptions } from 'typeorm';
import { UsersPaginationPipe } from './others/users.pagination.pipe';
import { MySQLRepositoryService } from 'src/core/repositories';

@ApiController('users')
export class UsersController {

	constructor(
		private readonly userService: UsersService,
		private readonly mysqlRepository: MySQLRepositoryService
	) {}

	@Get('list')
	@AuthProtection()
	public list(@Query(new UsersPaginationPipe()) options: FindManyOptions<User>): Promise<[User[], number]> {

		return this.mysqlRepository.get(User).findAndCount(options);
	}

	@Get('details/:id')
	@AuthProtection()
	public getOne(@Param('id') id: string): Promise<User> {

		return this.userService.getOne(id);
	}

	@Post('create')
	@AuthProtection()
	public create(@Body(new ValidateBodyPipe(CREATE_USER_VALIDATION)) user: CreateUserDTO): Promise<SuccessSaveMessage> {

		return this.userService.create(user);
	}

	@Put('update-password/:id')
	@AuthProtection()
	public updatePassword(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_PASSWORD_VALIDATION)) password_payload: UpdatePasswordDTO): Promise<SuccessSaveMessage> {

		return this.userService.updatePassword(id, password_payload);
	}

	@Put('update-status/:id')
	@AuthProtection()
	public updateStatus(@Param('id') id: string): Promise<SuccessSaveMessage> {

		return this.userService.updateStatus(id);
	}
	
	@Put('update/:id')
	@AuthProtection()
	public update(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_USER_VALIDATION)) user: UpdateUserDTO): Promise<SuccessSaveMessage> {

		return this.userService.update(id, user);
	}

}
