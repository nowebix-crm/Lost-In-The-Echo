import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';

import { sequelize } from '../../db/db-connection';

import { UserModel } from './users';

export class CompanyInfoModel extends Model<InferAttributes<CompanyInfoModel>, InferCreationAttributes<CompanyInfoModel>> {
  declare id: CreationOptional<string>;
  declare user_id: string;
  declare company_name?: string;
  declare department?: string;
  declare position?: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
}

CompanyInfoModel.init(
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
      company_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      position: {
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
      tableName: 'company_info',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
  },
);

CompanyInfoModel.belongsTo(UserModel, { targetKey: 'id', foreignKey: 'user_id', as: 'company_info' });

export default CompanyInfoModel;