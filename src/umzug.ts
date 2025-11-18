import path from 'path';
import { fileURLToPath } from 'url';
import { Umzug, SequelizeStorage } from 'umzug';

import { sequelize } from './db/db-connection';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const migrator = new Umzug({
    migrations: {
        glob: ['./data-access/migrations/*.ts', { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
        sequelize,
    }),
    logger: console,
});

export type Migration = typeof migrator._types.migration;
