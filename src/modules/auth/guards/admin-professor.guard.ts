import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/database/entities';
import { TokenPayload } from 'src/modules/auth/token/utils/token.type';
import * as dotenv from 'dotenv';
import { UserType } from 'src/modules/user/utils/users.type';

dotenv.config();

// enum UserType {
//     ADMIN = 'ADMIN',
//     PROFESSOR = 'ADMIN',
//     STUDENT = 'ADMIN'
// }

@Injectable()
export class AdminProfessorGuard implements CanActivate {

	private UserTypeEnum = UserType;

	public async canActivate(context: ExecutionContext): Promise<boolean> {

		const request = context.switchToHttp().getRequest();
		const token = (request.headers.authorization).replace('Bearer ', '');
		const userData = await this.getUserData(token);

		if (userData.type === this.UserTypeEnum.ADMIN || userData.type === this.UserTypeEnum.PROFESSOR) {

			return true;
		}

		throw new UnauthorizedException();
	}

	private async getUserData(token: string): Promise<User> {

		const jwtService = new JwtService({
			secret: process.env.JWT_KEY
		});

		return await jwtService.verifyAsync(token).then((data: TokenPayload): User => {

			const user = new User();
			user.id = data.id;
			user.name = data.name;
			user.email = data.email;
			user.active = data.active;
			user.created_at = data.created_at;
			user.type = data.type;

			return user;
		});
	}

}
