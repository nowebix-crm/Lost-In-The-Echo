import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from '@sequelize/core';
import { sequelize } from '../../db/db-connection';

export type GenderEnum = 'male' | 'female';
export type StatusEnum = 'active' | 'inactive';
export type SourceEnum = 'site' | 'ad' | 'referral' | 'cold_call';
export type PriorityEnum = 'low' | 'medium' | 'high' | 'highest';

export class ClientModel extends Model<
  InferAttributes<ClientModel>,
  InferCreationAttributes<ClientModel>
> {
  declare id: CreationOptional<string>;
  declare organization_id: string;
  declare manager_id: string | null;
  declare first_name: string | null;
  declare last_name: string | null;
  declare phone: string | null;
  declare email: string | null;
  declare birthday: Date | null;
  declare address: string | null;
  declare status: StatusEnum;
  declare gender: GenderEnum | null;
  declare source: SourceEnum | null;
  declare priority: PriorityEnum;
  declare notes: string | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
}

ClientModel.init(
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
    manager_id: {
      type: DataTypes.UUID,
      allowNull: true,
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
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: true,
    },
    source: {
      type: DataTypes.ENUM('site', 'ad', 'referral', 'cold_call'),
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'highest'),
      defaultValue: 'medium',
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'clients',
    paranoid: true,
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);
