import { DataTypes } from '@sequelize/core';
import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'activities';

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
    author_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        table: 'users',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    entity_type: {
      type: 'activity_entity_enum',
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: 'activity_type_enum',
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    due_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed_at: {
      type: DataTypes.DATE,
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
      name: 'idx_activities_org_id',
    });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['author_id'], {
    name: 'idx_activities_author_id',
  });
  await sequelize
    .getQueryInterface()
    .addIndex(TABLE_NAME, ['entity_type', 'entity_id'], {
      name: 'idx_activities_entity',
    });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['type'], {
    name: 'idx_activities_type',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['due_at'], {
    name: 'idx_activities_due',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
