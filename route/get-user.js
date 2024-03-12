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

exports.getUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const users = await client.query(`SELECT * FROM users`);
    res.send({ users });
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
};
