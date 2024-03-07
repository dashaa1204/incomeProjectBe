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
  console.log(newUser);
  try {
    client.query(
      `INSERT INTO users (name, password, email) VALUES ('${newUser.name}', '${newUser.password}', '${newUser.email}')`
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

app.post("/category", async (req, res) => {
  const client = await pool.connect();
  id = nanoid;
  try {
    client.query(
      `INSERT INTO category (name, description, createdAt, updatedAt, category_image)`
    );
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
});

// app.get("/fix", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     client.query(`alter table users RENAME column age to id`);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
// });

// app.get("/init", async () => {
//   const client = await pool.connect();

//   try {
//     client.query(
//       `CREATE TABLE transaction (id VARCHAR(255), userid VARCHAR(255), name TEXT)`
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
