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

exports.addUser = async (req, res) => {
  const client = await pool.connect();
  const newUser = req.body;
  console.log(newUser);
  try {
    client.query(
      `INSERT INTO users (name, id, password, email) VALUES ('${newUser.name}', '${newUser.id}', '${newUser.password}', '${newUser.email}')`
    );
    res.status(200).send({ message: "User added successfully" });
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
};
