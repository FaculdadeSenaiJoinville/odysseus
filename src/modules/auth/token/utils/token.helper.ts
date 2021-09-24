import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/database/entities';
import { TokenPayload } from './token.type';

@Injectable()
export class TokenHelper {

	constructor(private readonly jwtService: JwtService) {}

	public generateToken({ id, name, email, created_at, active, type }: User, expiresIn: number): Promise<string> {

		const secret = process.env.JWT_KEY;

		const payload = {
			id,
			name,
			email,
			created_at,
			active,
			type
		};

		return this.jwtService.signAsync(payload, { secret, expiresIn });
	}

	public async getUserData(token: string): Promise<User> {

		return await this.jwtService.verifyAsync(token).then((data: TokenPayload): User => {

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
