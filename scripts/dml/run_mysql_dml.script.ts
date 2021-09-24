import * as readline from 'readline';
import { exec, ExecException } from 'child_process';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function callback(error: ExecException, stdout: string, stderr: string) {

	console.log(24545);

	if (error) {

		console.error(`error: ${error.message}`);
		return;
	}

	if (stderr) {

		console.error(`stderr: ${stderr}`);
		return;
	}

	console.info(`stdout: ${stdout}`);
}

rl.question('Nome do script: ', scriptName => {

	const operation = `ts-node -r tsconfig-paths/register ./src/core/database/mysql/scripts/${scriptName}`;

	console.log(operation);

	exec(operation, callback);

	rl.close();
});
