import { DataTypes } from '@sequelize/core';
import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'companies';

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
      references: {
        model: 'organizations',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    manager_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    source: {
      type: 'source_enum',
      allowNull: true,
    },
    status: {
      type: 'status_enum',
      defaultValue: 'active',
      allowNull: true,
    },
    priority: {
      type: 'priority_enum',
      defaultValue: 'medium',
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
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
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['organization_id'], {
    name: 'idx_companies_org_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['manager_id'], {
    name: 'idx_companies_manager_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['status'], {
    name: 'idx_companies_status',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['priority'], {
    name: 'idx_companies_priority',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['name'], {
    name: 'idx_companies_name',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

