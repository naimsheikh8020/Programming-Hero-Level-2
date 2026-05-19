import { neon } from "@neondatabase/serverless";
import config from "../config/index.js";

export const sql = neon(config.database_url);

export const init = async () => {
  await sql`
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(75) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    age INT,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    createdAT timestamp NOT NULL DEFAULT NOW(),
    updatedAT timestamp NOT NULL DEFAULT NOW()
  )
  `;

  await sql`
  CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY, 
    customerId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK(quantity > 0),
    food TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    createdAT timestamp NOT NULL DEFAULT NOW(),
    updatedAT timestamp NOT NULL DEFAULT NOW()
  )
  `;
  console.log("Database Connected");
};
