import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoConfig, mysqlConfig } from './core/database';
import { modules } from './modules';

@Module({
	imports: [
		TypeOrmModule.forRoot(mysqlConfig),
		TypeOrmModule.forRoot(mongoConfig),
		...modules
	]
})
export class AppModule {}
