import { DataTypes } from '@sequelize/core';
import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'clients';

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
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    status: {
      type: 'status_enum',
      defaultValue: 'active',
      allowNull: true,
    },
    gender: {
      type: 'gender_enum',
      allowNull: true,
    },
    source: {
      type: 'source_enum',
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
    name: 'idx_clients_org_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['manager_id'], {
    name: 'idx_clients_manager_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['status'], {
    name: 'idx_clients_status',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['priority'], {
    name: 'idx_clients_priority',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['phone'], {
    name: 'idx_clients_phone',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['email'], {
    name: 'idx_clients_email',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['last_name', 'first_name'], {
    name: 'idx_clients_fullname',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

