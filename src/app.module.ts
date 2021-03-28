import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [
		AuthModule,
		UserModule
	]
})
export class AppModule {}
