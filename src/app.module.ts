import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoConfig, mysqlConfig } from './core/database';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

const databaseConnections = [
	TypeOrmModule.forRoot(mysqlConfig),
	TypeOrmModule.forRoot(mongoConfig)
];

const modules = [
	AuthModule,
	UserModule
];

@Module({
	imports: [
		...databaseConnections,
		...modules
	]
})
export class AppModule {}
