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

exports.editCol = async (req, res) => {
  const client = await pool.connect();
  try {
    client.query(`ALTER users ALTER COLUMN id VARCHAR(255)')`);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
};
