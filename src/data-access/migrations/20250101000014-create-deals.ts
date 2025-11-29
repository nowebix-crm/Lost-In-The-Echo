import { DataTypes } from '@sequelize/core';
import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'deals';

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
        table: 'organizations',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        table: 'clients',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        table: 'companies',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    manager_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        table: 'users',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'USD',
      allowNull: true,
    },
    stage_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        table: 'pipeline_stages',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
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
    name: 'idx_deals_org_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['manager_id'], {
    name: 'idx_deals_manager_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['client_id'], {
    name: 'idx_deals_client_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['company_id'], {
    name: 'idx_deals_company_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['stage_id'], {
    name: 'idx_deals_stage_id',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['amount'], {
    name: 'idx_deals_amount',
  });

  // Create GIN index for title using pg_trgm
  await sequelize.query(
    `CREATE INDEX idx_deals_title_trgm ON ${TABLE_NAME} USING gin (title gin_trgm_ops);`
  );
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

