import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

console.log({ POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER });

const db = new Pool({
  host: "localhost",
  database: "soc_store",
  user: "latif_essam",
  password: "l1234",
});

export default db;
