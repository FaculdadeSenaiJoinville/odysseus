import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { ErrorHelper } from './others/error.helper';

@Module({
	providers: [
		ErrorService,
		ErrorHelper
	],
	exports: [
		ErrorService
	]
})
export class ErrorModule {}
