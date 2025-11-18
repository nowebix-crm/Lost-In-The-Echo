import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DB_NAME;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: DB,
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: Number(PORT),
  clientMinMessages: 'notice',
});

export { sequelize };
