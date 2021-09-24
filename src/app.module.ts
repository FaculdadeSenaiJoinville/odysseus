import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './core/database';
import { modules } from './modules';

@Module({
	imports: [
		TypeOrmModule.forRoot(mysqlConfig),
		...modules
	]
})
export class AppModule {}
