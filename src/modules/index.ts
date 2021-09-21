import { AuthModule } from './auth/auth.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { GroupModule } from './group/group.module';
import { UsersModule } from './user/users.module';

export const modules = [
	AuthModule,
	UsersModule,
	ChatbotModule,
	GroupModule
];
