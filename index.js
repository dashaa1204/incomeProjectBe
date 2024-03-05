const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgConfig = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConfig);

app.post("/add-user", async (req, res) => {
  const client = await pool.connect();
  const newUser = req.body;
  try {
    client.query(
      `INSERT INTO users (name, age, email) VALUES ('${newUser.name}', '${newUser.age}', '${newUser.email}')`
    );
    res.status(200).send({ message: "User added successfully" });
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
});

app.post("/delete-user", async (req, res) => {
  const client = await pool.connect();
  try {
    client.query(`DELETE FROM users WHERE name='dashaa'`);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
});

// app.get("/init", async () => {
//   const client = await pool.connect();
//   try {
//     client.query(
//       "CREATE TABLE users (name VARCHAR(255), age INT, phone VARCHAR(255), email VARCHAR(255))"
//     );
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.release();
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
