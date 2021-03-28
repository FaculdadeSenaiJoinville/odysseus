import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/core/database/mysql/entities';
import { AuthGuard } from '../../core/auth';
import { CreateUserOutput } from './others/user.types';

@Controller('users')
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Post('create')
	@UseGuards(AuthGuard)
	public async create(@Body() user: User): Promise<CreateUserOutput> {

		return this.userService.create(user);
	}

}
