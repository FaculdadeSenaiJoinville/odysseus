import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './core/repository/filters/entity-not-found-exception.filter';

async function bootstrap() {
	
	const app = await NestFactory.create(AppModule);
	
	app.enableCors();
	app.useGlobalFilters(new EntityNotFoundExceptionFilter());
	
	const config = new DocumentBuilder()
		.setTitle('PES API')
		.setDescription(`API's da escola sistêmica.`)
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	
	SwaggerModule.setup('api', app, document);

	await app.listen(3000).then(() => console.log(`Servidor iniciado na porta ${3000}`));
}

bootstrap();
