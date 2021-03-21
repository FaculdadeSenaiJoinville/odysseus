import { join } from 'path';

const ormconfig = require('../../ormconfig.json');

const mysqlConfig = { ...ormconfig[0] };

mysqlConfig.entities = [join(__dirname, 'entities', 'classes', '*.entity.{ts,js}')];
mysqlConfig.migrations = [join(__dirname, 'migrations', '*.{ts,js}')];
mysqlConfig.cli = {
	entitiesDir: join(__dirname, 'entities'),
	migrationsDir: join(__dirname, 'migrations')
};

export { mysqlConfig };