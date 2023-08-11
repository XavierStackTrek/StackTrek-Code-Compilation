const pool = require("./db");

// Create the 'users' table
async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL
    )
  `;

  try {
    const client = await pool.connect();
    await client.query(query);
    console.log("Table 'users' created successfully");
    client.release();
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end(); // Close the database connection
  }
}

createTable();
