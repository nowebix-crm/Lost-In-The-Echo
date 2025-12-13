import { DataTypes } from '@sequelize/core';
import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'users';

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
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    organization_custom_role_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: 'status_enum',
      defaultValue: 'active',
      allowNull: true,
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
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Create indexes
  await sequelize
    .getQueryInterface()
    .addIndex(TABLE_NAME, ['organization_id'], {
      name: 'idx_users_org_id',
    });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['role_id'], {
    name: 'idx_users_role_id',
  });

  await sequelize.getQueryInterface().addConstraint(TABLE_NAME, {
    fields: ['organization_id'],
    type: 'FOREIGN KEY',
    name: 'fk_users_organization',
    references: {
      table: 'organizations',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  await sequelize.getQueryInterface().addConstraint(TABLE_NAME, {
    fields: ['organization_custom_role_id'],
    type: 'FOREIGN KEY',
    name: 'fk_users_organization_custom_role',
    references: {
      table: 'organization_custom_roles',
      field: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  await sequelize.getQueryInterface().addConstraint(TABLE_NAME, {
    fields: ['role_id'],
    type: 'FOREIGN KEY',
    name: 'fk_users_role',
    references: {
      table: 'roles',
      field: 'id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeConstraint(TABLE_NAME, 'fk_users_organization');

  await sequelize
    .getQueryInterface()
    .removeConstraint(TABLE_NAME, 'fk_users_organization_custom_role');

  await sequelize
    .getQueryInterface()
    .removeConstraint(TABLE_NAME, 'fk_users_role');
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
