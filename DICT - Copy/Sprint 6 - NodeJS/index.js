const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//CREATE
app.post("/users/create", async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    console.log(req.params);
    const newUser = await pool.query(
      `INSERT INTO users ("first_name", "last_name") VALUES($1, $2) RETURNING *`,
      [firstname, lastname]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//READ
//get all users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//select a user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const selectUser = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    res.json(selectUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE a user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname } = req.body;
    const updateUser = await pool.query(
      `UPDATE users SET "first_name" = $1, "last_name" = $2 WHERE user_id = $3`,
      [firstname, lastname, id]
    );
    res.json(`User id: ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE a user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );
    res.json("User was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
