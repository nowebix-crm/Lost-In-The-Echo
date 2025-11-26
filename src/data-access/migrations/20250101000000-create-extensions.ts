import type { Migration } from '../../umzug.js';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');
  await sequelize.query('CREATE EXTENSION IF NOT EXISTS pg_trgm;');
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.query('DROP EXTENSION IF EXISTS pg_trgm;');
  await sequelize.query('DROP EXTENSION IF EXISTS pgcrypto;');
};

