import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';

import { sequelize } from '../../db/db-connection';

import { UserModel } from './users';

export class BankInfoModel extends Model<InferAttributes<BankInfoModel>, InferCreationAttributes<BankInfoModel>> {
  declare id: CreationOptional<string>;
  declare user_id: string;
  declare card_number?: string;
  declare expiry_date?: string;
  declare currency?: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
}

BankInfoModel.init(
  {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      expiry_date: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
  },
  {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      tableName: 'bank_info',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
  },
);

UserModel.hasOne(BankInfoModel, { sourceKey: 'id', foreignKey: 'user_id', as: 'bank_info' });

export default BankInfoModel;