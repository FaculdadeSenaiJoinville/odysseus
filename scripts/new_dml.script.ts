import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getFileDir(scriptName: string, databaseSystem: string): string {

    scriptName = scriptName.toLowerCase();
    databaseSystem = databaseSystem.toLowerCase();

    const date = new Date().toISOString();
    const scriptID = date.split('.')[0].replace(/-/g, '').replace(/:/g, '').replace('T', '');
    
    return `src/core/database/${databaseSystem}/scripts/${scriptID}_${scriptName}.script.ts`;
}

function getFileContent(databaseSystem: string): string {

    databaseSystem = databaseSystem.toLocaleLowerCase();

    return `
import { ${databaseSystem}Config } from "src/core/database";
import { createConnection } from "typeorm";

createConnection(${databaseSystem}Config)
    .then(async connection => {

        const repository = connection.getRepository(<Entity>);

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
    
    rl.question("Nome da base (mongo | mysql): ", databaseSystem => {

        const fileDir = getFileDir(scriptName, databaseSystem);
        const fileContent = getFileContent(databaseSystem);

        fs.writeFileSync(fileDir, fileContent);

        rl.close();
    });
});