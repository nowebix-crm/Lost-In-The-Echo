import { DataTypes } from '@sequelize/core';

import type { Migration } from '../../umzug';

import {
    USER_ROLES,
    USER_STATUSES,
    USER_GENDERS,
} from '../../constants/users-contstants';

const TABLE_NAME = 'users';

export const up: Migration = async ({ context: sequelize }) =>
    await sequelize.getQueryInterface().createTable(TABLE_NAME, {
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
            USER_ROLES.FREE,
            USER_ROLES.PREMIUM,
            USER_ROLES.ADMIN,
        ),
        allowNull: false,
        defaultValue: USER_ROLES.FREE,
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
  });

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
