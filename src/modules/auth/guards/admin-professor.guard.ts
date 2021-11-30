import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../core/database/entities';
import { UserType } from '../../user/utils/users.type';
import { TokenPayload } from '../token/utils/token.type';

@Injectable()
export class AdminProfessorGuard implements CanActivate {

	public async canActivate(context: ExecutionContext): Promise<boolean> {

		const request = context.switchToHttp().getRequest();
		const token = (request.headers.authorization).replace('Bearer ', '');
		const userData = await this.getUserData(token);

		return userData.type === UserType.ADMIN || userData.type === UserType.PROFESSOR;
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
