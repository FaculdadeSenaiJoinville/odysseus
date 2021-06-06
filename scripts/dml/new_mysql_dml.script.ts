import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getFileDir(scriptName: string): string {

    scriptName = scriptName.toLowerCase();

    const date = new Date().toISOString();
    const scriptID = date.split('.')[0].replace(/-/g, '').replace(/:/g, '').replace('T', '');
    
    return `src/core/database/mysql/scripts/${scriptID}_${scriptName}.script.ts`;
}

function getFileContent(): string {

    return `
import { createConnection } from "typeorm";
import { Entity } from "../entities";

createConnection('mysqlConnection')
    .then(async connection => {

        const repository = connection.getRepository(Entity);

        // Processos a serem executados
        // ...

        connection.close();
        process.exit();
    })
    .catch(error => {

        console.error(error);
        process.exit();
    });
`;
}

rl.question("Nome do script: ", scriptName => {
    
    const fileDir = getFileDir(scriptName);
    const fileContent = getFileContent();

    fs.writeFileSync(fileDir, fileContent);

    rl.close();
});