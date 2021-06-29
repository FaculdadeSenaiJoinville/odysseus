import { Module } from '@nestjs/common';
import { MongoRepositoryService } from './mongo-repository.service';

@Module({
	providers: [
		MongoRepositoryService
	],
	exports: [
		MongoRepositoryService
	]
})
export class MongoRepositoryModule {}
