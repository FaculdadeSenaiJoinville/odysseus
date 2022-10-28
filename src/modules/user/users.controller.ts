import { Body, Get, Param, Post, Put, Query, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CREATE_USER_VALIDATION, UPDATE_PASSWORD_VALIDATION, UPDATE_USER_VALIDATION } from './utils/users.validation';
import { User } from 'src/core/database/entities';
import { ValidateBodyPipe } from 'src/common/pipes';
import { AdminProfessorProtection, ApiController, AuthProtection } from 'src/common/decorators';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dtos';
import { ListOptions, SuccessSaveMessage } from '../../common/types';
import { UsersPaginationPipe } from './utils/users-pagination.pipe';
import { UsersRepository } from './utils/users.repository';
import { FileInterceptor } from '@nestjs/platform-express';
import { UPLOAD_CONFIG } from 'src/core/upload/upload.config';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

@ApiController('users')
export class UsersController {

	constructor(
		private readonly userService: UsersService,
		private readonly usersRepository: UsersRepository
	) {}

	@Get('list')
	@AuthProtection()
	@AdminProfessorProtection()
	public list(@Query(new UsersPaginationPipe()) options: ListOptions<User>): Promise<[User[], number]> {

		return this.usersRepository.list(options);
	}


	@Get('details/:id')
	@AuthProtection()
	public details(@Param('id') id: string): Promise<User> {

		return this.usersRepository.details(id);
	}

	@Post('create')
	@AuthProtection()
	@AdminProfessorProtection()
	public create(@Body(new ValidateBodyPipe(CREATE_USER_VALIDATION)) user: CreateUserDTO): Promise<SuccessSaveMessage> {

		return this.userService.create(user);
	}

	@Post('changePhoto')
	@AuthProtection()
	@UseInterceptors(FileInterceptor('image', {
		storage: diskStorage({
			destination: UPLOAD_CONFIG.destination,
			filename: (req, file, cb) => {
				const extension = path.parse(file.originalname).ext;
				cb(null, `${uuidv4()}${extension}`);
			}
		})
	}))

	public changePhoto(@UploadedFile() file: Express.Multer.File, @Request() request): Promise<SuccessSaveMessage> {
		return this.userService.changePhoto(request.body.id, file);
	}

	@Put('update-password/:id')
	@AuthProtection()
	public updatePassword(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_PASSWORD_VALIDATION)) password_payload: UpdatePasswordDTO): Promise<SuccessSaveMessage> {

		return this.userService.updatePassword(id, password_payload);
	}
	
	@Put('update/:id')
	@AuthProtection()
	@AdminProfessorProtection()
	public update(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_USER_VALIDATION)) user: UpdateUserDTO): Promise<SuccessSaveMessage> {

		return this.userService.update(id, user);
	}

}
