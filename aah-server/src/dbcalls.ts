import { Client } from "pg";
import type { UserType } from "./types.js";
import { exit } from "process";

const client = new Client({
  user: process.env.SERVER_DB_USER,
  host: process.env.SERVER_DB_HOST,
  database: process.env.SERVER_DATABASE,
  password: process.env.SERVER_DB_USER_PASSWORD,
  port: parseInt(process.env.SERVER_DB_PORT ?? "5432"),
});

export function connectToDB() {
  client
    .connect()
    .then(() => console.log("Got connection to 'data_playground'."))
    .catch((err) => {
      console.error("Darn it, no connection to database.", err.stack);
      exit(1);
    });
  createTableIfNotExists();
}


const createTableSql = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export async function insertUser(name: string, email: string) {
  const insertSql = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;
  try {
    const res = await client.query(insertSql, [name, email]);
    console.log("Added: ", res.rows[0]);
    return res.rows[0] as UserType;
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Error inserting user", err.stack);
    else console.error("Error inserting user", err);
  }
}

export async function fetchUsers() {
  try {
    const res = await client.query("SELECT * FROM users");
    return res.rows as UserType[];
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Error fetching users", err.stack);
    else console.error("Error fetching users", err);
  }
}

export async function fetchUserById(id: number): Promise<UserType | undefined> {
  try {
    const res = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    if (res.rowCount === 1) return res.rows[0] as UserType;
    else return undefined;
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Error fetching users", err.stack);
    else console.error("Error fetching users", err);
  }
}

export async function updateUser(email: string, id: number) {
  const insertSql = `UPDATE users SET email = $1 where id = $2 RETURNING *`;
  try {
    const res = await client.query(insertSql, [email, id]);
    if (res.rowCount === 1) {
      console.log("Updated: ", res.rows[0]);
      return res.rows[0] as UserType;
    } else return undefined;
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Error updating user", err.stack);
    else console.error("Error updating user", err);
  }
}

export async function deleteUser(id: number) {
  const insertSql = `DELETE FROM users WHERE id = $1 RETURNING *`;
  try {
    const res = await client.query(insertSql, [id]);
    if (res.rowCount === 1) {
      console.log("Deleted: : ", res.rows[0]);
      return res.rows[0] as UserType;
    } else return undefined;
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Error deleting user", err.stack);
    else console.error("Error deleting user", err);
  }
}

function createTableIfNotExists() {
  client
    .query(createTableSql)
    .then(() => console.log("'users' table created."))
    .catch((err) => {
      console.error("Darn it, no table was created.", err.stack);
      exit(1);
    });
}