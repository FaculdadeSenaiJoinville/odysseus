import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/database/mysql/entities';
import { CreateUserOutput } from 'src/types/modules';
import { AuthGuard } from '../auth';

@Controller('users')
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Post('create')
	@UseGuards(AuthGuard)
	public async create(@Body() user: User): Promise<CreateUserOutput> {

		return this.userService.create(user);
	}

}
