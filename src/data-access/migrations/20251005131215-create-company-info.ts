import { DataTypes } from '@sequelize/core';

import type { Migration } from '../../umzug.js';

const TABLE_NAME = 'company_info';

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
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
