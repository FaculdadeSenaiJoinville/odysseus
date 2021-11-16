
import { HttpModule, Module } from '@nestjs/common';
import { DialogflowService } from './dialogflow.service';

@Module({
	imports: [
		HttpModule
	],
	providers: [
		DialogflowService
	],
	exports: [
		DialogflowService
	]
})
export class DialogflowModule {}
