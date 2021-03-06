import { Module } from '@nestjs/common';
import { ErrorModule } from '../../error/errors.module';
import { MySQLRepositoryService } from './mysql-repository.service';

@Module({
	imports: [
		ErrorModule
	],
	providers: [
		MySQLRepositoryService
	],
	exports: [
		MySQLRepositoryService
	]
})
export class MySQLRepositoryModule {}
