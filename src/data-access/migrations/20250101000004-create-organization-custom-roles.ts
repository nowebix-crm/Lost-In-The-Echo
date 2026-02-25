import { DataTypes } from '@sequelize/core';
import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'organization_custom_roles';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  await sequelize
    .getQueryInterface()
    .addIndex(TABLE_NAME, ['organization_id'], {
      name: 'idx_organization_custom_roles_org_id',
    });

  await sequelize.getQueryInterface().addConstraint(TABLE_NAME, {
    fields: ['organization_id'],
    type: 'FOREIGN KEY',
    name: 'fk_organization_custom_roles_organization',
    references: {
      table: 'organizations',
      field: 'id',
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeConstraint(TABLE_NAME, 'fk_organization_custom_roles_organization');

  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
