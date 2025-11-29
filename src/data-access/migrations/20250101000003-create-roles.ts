import { DataTypes } from '@sequelize/core';
import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'roles';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    organization_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Create index for organization_id
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['organization_id'], {
    name: 'idx_roles_org_id',
  });

  await sequelize.getQueryInterface().addConstraint(TABLE_NAME, {
    fields: ['organization_id'],
    type: 'FOREIGN KEY',
    name: 'fk_roles_organization',
    references: {
      table: 'organizations',
      field: 'id',
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeConstraint(TABLE_NAME, 'fk_roles_organization');
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

