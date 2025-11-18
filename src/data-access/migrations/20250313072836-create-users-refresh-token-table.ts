import { DataTypes } from '@sequelize/core';

import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'user_refresh_token';

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable(TABLE_NAME, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING(512),
            unique: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
