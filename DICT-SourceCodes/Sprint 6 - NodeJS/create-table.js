const sql = require("./db");

async function createTable() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS users_base (
      user_id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL
    )
  `;
    console.log("Table 'users' created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable();
