import type { Migration } from '../../umzug';

const up: Migration = async ({ context: sequelize }) => {
    await sequelize.query(
        `
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_user_roles') THEN
                    CREATE TYPE enum_user_role AS ENUM ('free_client', 'premium_client', 'admin');
                END IF;
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_user_status') THEN
                    CREATE TYPE enum_user_status AS ENUM ('active', 'disabled');
                END IF;
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_user_gender') THEN
                    CREATE TYPE enum_user_gender AS ENUM ('male', 'female');
                END IF;
            END $$;
        `
    );
};

const down: Migration = async ({ context: sequelize }) => {
    await sequelize.query(
        `
            DO $$
            BEGIN
                DROP TYPE IF EXISTS enum_user_role;
                DROP TYPE IF EXISTS enum_user_status;
                DROP TYPE IF EXISTS enum_user_gender;
            END $$;
        `
    );
};

export { up, down };