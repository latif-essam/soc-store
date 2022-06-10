import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const {
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

// console.log({ POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER });

const db = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  port: POSTGRES_PORT as unknown as number,
});

export default db;
