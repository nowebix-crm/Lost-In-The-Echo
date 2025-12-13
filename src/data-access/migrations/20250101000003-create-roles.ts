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
    name: {
      type: DataTypes.ENUM(
        'admin',
        'organization_owner',
        'organization_manager',
        'organization_client'
      ),
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
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  const now = new Date();
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, [
    {
      name: 'admin',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'organization_owner',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'organization_manager',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'organization_client',
      created_at: now,
      updated_at: now,
    },
  ]);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
  await sequelize.getQueryInterface().bulkDelete(TABLE_NAME, {
    where: {
      name: [
        'admin',
        'organization_owner',
        'organization_manager',
        'organization_client',
      ],
    },
  });
};
