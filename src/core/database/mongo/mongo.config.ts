import { join } from 'path';

const ormconfig = require('../../../ormconfig.json');

const mongoConfig = { ...ormconfig[1] };

mongoConfig.entities = [join(__dirname, 'entities', 'classes', '*.entity.{ts,js}')];
mongoConfig.migrations = [join(__dirname, 'migrations', '*.{ts,js}')];
mongoConfig.cli = {
	entitiesDir: join(__dirname, 'entities'),
	migrationsDir: join(__dirname, 'migrations')
};

export { mongoConfig };