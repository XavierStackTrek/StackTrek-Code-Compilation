const express = require("express");
const sql = require("./db");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.get("/", async (req, res) => {
  res.send("Hello There");
});

//CREATE
app.post("/users/create", async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    console.log(req.params);
    const newUser =
      await sql`INSERT INTO users ("first_name", "last_name") VALUES(${firstname}, ${lastname}) RETURNING *`;

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
  }
});

//READ
//get all users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await sql`SELECT * FROM users`;
    res.json(allUsers);
  } catch (err) {
    console.error(err.message);
  }
});

//Select a user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const selectUser = await sql`SELECT * FROM users WHERE user_id = ${id}`;

    res.json(selectUser);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE a user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname } = req.body;
    const updateUser = await sql`
    UPDATE users 
    SET "first_name" = ${firstname}, "last_name" = ${lastname} 
    WHERE user_id = ${id}`;

    res.json(`User id: ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE a user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await sql`DELETE FROM users WHERE user_id = ${id}`;
    res.json("User was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
