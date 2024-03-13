const { Pool } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

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

async function addUser(userInfo) {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query(
      `INSERT INTO users (name, id, password, email) VALUES ('${userInfo.name}', '${userInfo.id}', '${userInfo.password}', '${userInfo.email}')`
    );
    response.status(200).send({ message: "User added successfully" });
  } catch (e) {
    throw new Error(e ? e.message : "Error");
  } finally {
    client.release();
  }
  return response.rows;
}

module.exports = {
  addUser,
};

// exports.deleteUser = async (req, res) => {
//   const client = await pool.connect();
//   try {
//     client.query(`DELETE FROM users WHERE name='123'`);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
// };

// exports.getUser = async (req, res) => {
//   const client = await pool.connect();
//   try {
//     const users = await client.query(`SELECT * FROM users`);
//     res.send({ users });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
// };
