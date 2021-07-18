import { Module } from '@nestjs/common';
import { ErrorsModule } from '../../error/errors.module';
import { MySQLRepositoryService } from './mysql-repository.service';

@Module({
	imports: [
		ErrorsModule
	],
	providers: [
		MySQLRepositoryService
	],
	exports: [
		MySQLRepositoryService
	]
})
export class MySQLRepositoryModule {}
