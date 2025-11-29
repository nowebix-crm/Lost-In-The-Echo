import { DataTypes } from '@sequelize/core';
import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'pipeline_stages';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    pipeline_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        table: 'pipelines',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
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

  // Create indexes
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['pipeline_id'], {
    name: 'idx_stages_pipeline',
  });
  await sequelize.getQueryInterface().addIndex(TABLE_NAME, ['position'], {
    name: 'idx_stages_position',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

