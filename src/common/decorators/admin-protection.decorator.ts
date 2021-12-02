import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../modules/auth/guards/admin.guard';

export function AdminProtection() {

	return applyDecorators(UseGuards(AdminGuard));
}
