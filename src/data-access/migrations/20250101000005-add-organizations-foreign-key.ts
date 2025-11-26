import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'organizations';

export const up: Migration = async ({ context: sequelize }) => {
  // Add foreign key constraint from organizations.owner_id to users.id
  await sequelize.getQueryInterface().addConstraint(TABLE_NAME, {
    fields: ['owner_id'],
    type: 'foreign key',
    name: 'fk_organizations_owner',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeConstraint(TABLE_NAME, 'fk_organizations_owner');
};

