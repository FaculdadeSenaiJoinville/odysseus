import { Module } from '@nestjs/common';
import { MySQLRepositoryService } from './mysql-repository.service';

@Module({
	providers: [
		MySQLRepositoryService
	],
	exports: [
		MySQLRepositoryService
	]
})
export class MySQLRepositoryModule {}
