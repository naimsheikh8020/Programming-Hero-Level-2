import pool from "../config/db.js";

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      
      name VARCHAR(100) NOT NULL,
      
      email VARCHAR(255) UNIQUE NOT NULL,
      
      password TEXT NOT NULL,
      
      role VARCHAR(20) NOT NULL DEFAULT 'contributor'
      CHECK (role IN ('contributor', 'maintainer')),
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(query);

  console.log("Users table created");
};

export default createUsersTable;