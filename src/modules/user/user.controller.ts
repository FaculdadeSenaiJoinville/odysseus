import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/core/database/mysql/entities';
import { AuthGuard } from '../../core/auth';
import { CreateUserOutput } from './others/user.type';
import { YupValidationPipe } from 'src/common/pipes';
import { CREATE_USER_VALIDATION } from './others/user.validation';

@Controller('users')
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Post('create')
	@UseGuards(AuthGuard)
	public async create(@Body(new YupValidationPipe(CREATE_USER_VALIDATION)) user: User): Promise<CreateUserOutput> {

		return this.userService.create(user);
	}

}
