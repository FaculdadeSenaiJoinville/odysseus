import { Body, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CREATE_USER_VALIDATION, UPDATE_PASSWORD_VALIDATION } from './others/user.validation';
import { User } from 'src/core/database/mysql/entities';
import { ValidateBodyPipe } from 'src/common/pipes';
import { ApiController, AuthProtection } from 'src/common/decorators';
import { CreateUserDTO, UpdatePasswordDTO } from './dtos';
import { SuccessMessageDTO } from '../../common/dtos/success-message.dto';

@ApiController('users')
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Post('create')
	@AuthProtection()
	public async create(@Body(new ValidateBodyPipe(CREATE_USER_VALIDATION)) user: CreateUserDTO): Promise<User> {

		return this.userService.create(user);
	}

	@Put('update-password/:id')
	public async updatePassword(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_PASSWORD_VALIDATION)) password_payload: UpdatePasswordDTO): Promise<SuccessMessageDTO> {
		
		return this.userService.updatePassword(id, password_payload);
	}

}
