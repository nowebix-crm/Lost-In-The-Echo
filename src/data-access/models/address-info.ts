import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';

import { sequelize } from '../../db/db-connection';

import { UserModel } from './users';

export class AddressInfoModel extends Model<InferAttributes<AddressInfoModel>, InferCreationAttributes<AddressInfoModel>> {
  declare id: CreationOptional<string>;
  declare user_id: string;
  declare country?: string;
  declare city?: string;
  declare zip?: string;
  declare address?: string;
  declare state?: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
}

AddressInfoModel.init(
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
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      state: {
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
      tableName: 'address_info',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
  },
);

AddressInfoModel.belongsTo(UserModel, { targetKey: 'id', foreignKey: 'user_id', as: 'address_info' });

export default AddressInfoModel;