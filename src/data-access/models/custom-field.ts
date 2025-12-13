import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from '@sequelize/core';
import { sequelize } from '../../db/db-connection';

export type CustomFieldEntityEnum = 'client' | 'company' | 'deal';

export class CustomFieldModel extends Model<
  InferAttributes<CustomFieldModel>,
  InferCreationAttributes<CustomFieldModel>
> {
  declare id: CreationOptional<string>;
  declare organization_id: string;
  declare entity_type: CustomFieldEntityEnum;
  declare entity_id: string;
  declare name: string;
  declare value: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
}

CustomFieldModel.init(
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
    entity_type: {
      type: DataTypes.ENUM('client', 'company', 'deal'),
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'custom_fields',
    paranoid: true,
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);
