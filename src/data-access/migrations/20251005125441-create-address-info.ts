import { DataTypes } from '@sequelize/core';

import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'address_info';

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable(TABLE_NAME, {
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
            type: DataTypes.STRING(512),
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
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
