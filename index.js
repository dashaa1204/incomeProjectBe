const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./route/user");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);

// router.post("/edit-col", editCol);
// router.post("/alter-col", alterCol);

// app.post("/delete-user", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     client.query(`DELETE FROM users WHERE name='dashaa'`);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
// });

// app.post("/category", async (req, res) => {
//   const client = await pool.connect();
//   id = nanoid;
//   try {
//     client.query(
//       `INSERT INTO category (name, description, createdAt, updatedAt, category_image)`
//     );
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
// });

// app.get("/addCol", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     client.query(`ALTER TABLE users ADD currency_type TEXT`);
//   } catch {
//     console.log(e);
//   } finally {
//     client.release();
//   }
// });

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
