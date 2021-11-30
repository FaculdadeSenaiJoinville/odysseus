import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminProfessorGuard } from '../../modules/auth/guards/admin-professor.guard';

export function AdminProfessorProtection() {

	return applyDecorators(UseGuards(AdminProfessorGuard));
}
