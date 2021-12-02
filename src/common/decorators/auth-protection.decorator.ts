import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '../../modules/auth/guards';

export function AuthProtection() {

	return applyDecorators(
		ApiHeader({ name: 'Authorization', required: true, description: 'Token de acesso retornado no login.' }),
		UseGuards(AuthGuard)
	);
}
