import { DataTypes, InferAttributes, InferCreationAttributes, Model, CreationOptional } from '@sequelize/core';

import { sequelize } from '../../db/db-connection';

export type ActivityEntityEnum = 'client' | 'company' | 'deal';
export type ActivityTypeEnum = 'note' | 'call' | 'meeting' | 'task' | 'email';

export class ActivityModel extends Model<InferAttributes<ActivityModel>, InferCreationAttributes<ActivityModel>> {
  declare id: CreationOptional<string>;
  declare organization_id: string;
  declare author_id: string;
  declare entity_type: ActivityEntityEnum;
  declare entity_id: string;
  declare type: ActivityTypeEnum;
  declare content: string | null;
  declare due_at: Date | null;
  declare completed_at: Date | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
}

ActivityModel.init(
  {
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
    author_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    entity_type: {
      type: DataTypes.ENUM('client', 'company', 'deal'),
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('note', 'call', 'meeting', 'task', 'email'),
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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'activities',
    paranoid: true,
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

