import type { Migration } from '../../umzug.js';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.query(`CREATE TYPE gender_enum AS ENUM ('male', 'female');`);
  await sequelize.query(
    `CREATE TYPE status_enum AS ENUM ('active', 'inactive');`
  );
  await sequelize.query(
    `CREATE TYPE source_enum AS ENUM ('site', 'ad', 'referral', 'cold_call');`
  );
  await sequelize.query(
    `CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high', 'highest');`
  );
  await sequelize.query(
    `CREATE TYPE contact_type_enum AS ENUM ('phone', 'email', 'telegram', 'whatsapp', 'viber', 'gmail', 'instagram');`
  );
  await sequelize.query(
    `CREATE TYPE activity_entity_enum AS ENUM ('client', 'company', 'deal');`
  );
  await sequelize.query(
    `CREATE TYPE activity_type_enum AS ENUM ('note', 'call', 'meeting', 'task', 'email');`
  );
  await sequelize.query(
    `CREATE TYPE custom_field_entity_enum AS ENUM ('client', 'company', 'deal');`
  );
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.query('DROP TYPE IF EXISTS custom_field_entity_enum;');
  await sequelize.query('DROP TYPE IF EXISTS activity_type_enum;');
  await sequelize.query('DROP TYPE IF EXISTS activity_entity_enum;');
  await sequelize.query('DROP TYPE IF EXISTS contact_type_enum;');
  await sequelize.query('DROP TYPE IF EXISTS priority_enum;');
  await sequelize.query('DROP TYPE IF EXISTS source_enum;');
  await sequelize.query('DROP TYPE IF EXISTS status_enum;');
  await sequelize.query('DROP TYPE IF EXISTS gender_enum;');
};
