
import { Module } from '@nestjs/common';
import { DialogflowService } from './dialogflow.service';
import { DialogflowHelper } from './utils/dialogflow.helper';

@Module({
	providers: [
		DialogflowService,
		DialogflowHelper
	],
	exports: [
		DialogflowService
	]
})
export class DialogflowModule {}
