const sql = require("./db");

async function createTable() {
  try {
    let noticeMessage = "";

    // Register a handler for NOTICE messages

    const data = await sql`
      CREATE TABLE IF NOT EXISTS users_base1 (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL
      )
    `;
    console.log("Table created successfully!");
    sql.end();
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable();
