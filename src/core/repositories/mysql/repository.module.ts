import { Module } from '@nestjs/common';
import { MySQLRepositoryService } from './repository.service';

@Module({
	providers: [
		MySQLRepositoryService
	],
	exports: [
		MySQLRepositoryService
	]
})
export class MySQLRepositoryModule {}
