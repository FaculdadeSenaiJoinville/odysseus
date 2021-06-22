import { Module } from '@nestjs/common';
import { MongoRepositoryService } from './repository.service';

@Module({
	providers: [
		MongoRepositoryService
	],
	exports: [
		MongoRepositoryService
	]
})
export class MongoRepositoryModule {}
