import { Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidateBodyPipe } from 'src/common/pipes';
import { CREATE_USER_VALIDATION } from './others/user.validation';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';
import { ApiController, AuthProtection } from 'src/common/decorators';

@ApiController('users')
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Post('create')
	@AuthProtection()
	public async create(@Body(new ValidateBodyPipe(CREATE_USER_VALIDATION)) user: CreateUserDTO): Promise<User> {

		return this.userService.create(user);
	}

}
