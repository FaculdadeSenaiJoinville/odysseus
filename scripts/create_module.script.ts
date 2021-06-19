import * as readline from 'readline';
import * as fs from 'fs';
import { promisify } from 'util';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const capitalize = (value: string) => {

	return value.charAt(0).toUpperCase() + value.slice(1)
}

function setControllerContent(moduleName: string) {

	const uppercasedFirstLetterModuleName = capitalize(moduleName);

	return `
import { Post } from '@nestjs/common';
import { ${uppercasedFirstLetterModuleName}Service } from './${moduleName}.service';
import { ApiController, AuthProtection } from 'src/common/decorators';

@ApiController('${moduleName}')
export class ${uppercasedFirstLetterModuleName}Controller {

	constructor(private readonly ${moduleName}Service: ${uppercasedFirstLetterModuleName}Service) {}

	@Post('create')
	@AuthProtection()
	public async create() {

		return this.${moduleName}Service.create();
	}

}
`;
}

function setModuleContent(moduleName: string) {

	const uppercasedFirstLetterModuleName = capitalize(moduleName);

	return `
import { Module } from '@nestjs/common';
import { ${uppercasedFirstLetterModuleName}Controller } from './${moduleName}.controller';
import { ${uppercasedFirstLetterModuleName}Service } from './${moduleName}.service';

@Module({
	controllers: [
		${uppercasedFirstLetterModuleName}Controller
	],
	providers: [
		${uppercasedFirstLetterModuleName}Service
	],
	exports: [
		${uppercasedFirstLetterModuleName}Service
	]
})
export class ${uppercasedFirstLetterModuleName}Module {}
`;
}

function setServiceContent(moduleName: string) {

	const uppercasedFirstLetterModuleName = capitalize(moduleName);

	return `
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${uppercasedFirstLetterModuleName}Service {

	constructor() {}

	public create() {

		return 'Opa bão!';
	}

}
`;
}

function createFiles(dir: string, moduleName: string) {

	const controllerDir = `${dir}/${moduleName}.controller.ts`;
	const moduleDir = `${dir}/${moduleName}.module.ts`;
	const serviceDir = `${dir}/${moduleName}.service.ts`;
	const controllerContent = setControllerContent(moduleName);
	const moduleContent = setModuleContent(moduleName);
	const serviceContent = setServiceContent(moduleName);

	fs.writeFileSync(controllerDir, controllerContent);
	fs.writeFileSync(moduleDir, moduleContent);
	fs.writeFileSync(serviceDir, serviceContent);
}

rl.question("Nome do modulo: ", async moduleName => {
    
    const fileDir = `src/modules/${moduleName}`;

	if (fs.existsSync(fileDir)) {
		
		console.log(`Já existe um módulo chamado ${moduleName}`);
	}
	else {
		
		fs.mkdirSync(fileDir);
	
		createFiles(fileDir, moduleName);
	}

    rl.close();
});