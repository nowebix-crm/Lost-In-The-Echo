import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';

import { sequelize } from '../../db/db-connection';

import { USER_STATUSES, USER_ROLES, USER_GENDERS } from '../../constants/users-contstants';

import { UserTokensModel } from './refresh-token';

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<string>;
  declare first_name: string;
  declare last_name: CreationOptional<string>;
  declare birth_date: CreationOptional<Date>;
  declare email: string;
  declare password: string;
  declare status: USER_STATUSES;
  declare role: USER_ROLES;
  declare phone: CreationOptional<string>;
  declare gender: CreationOptional<USER_GENDERS>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
}

UserModel.init(
  {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
            USER_STATUSES.ACTIVE,
            USER_STATUSES.DISABLED,
        ),
        allowNull: false,
        defaultValue: USER_STATUSES.ACTIVE,
      },
      role: {
        type: DataTypes.ENUM(
            USER_ROLES.CLIENT,
            USER_ROLES.ADMIN,
        ),
        allowNull: false,
        defaultValue: USER_ROLES.CLIENT,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      gender: {
        type: DataTypes.ENUM(
            USER_GENDERS.MALE,
            USER_GENDERS.FEMALE,
        ),
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
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      indexes: [
          {
              unique: true,
              fields: ['email', 'phone'],
          }
      ]
  },
);

UserModel.hasMany(UserTokensModel, { sourceKey: 'id', foreignKey: 'user_id', as: 'refresh_token' });
UserTokensModel.belongsTo(UserModel, { targetKey: 'id', foreignKey: 'user_id', as: 'user' });

export default UserModel;