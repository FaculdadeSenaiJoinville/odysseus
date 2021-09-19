import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './user/users.module';

export const modules = [
	AuthModule,
	UsersModule,
	GroupsModule
];
