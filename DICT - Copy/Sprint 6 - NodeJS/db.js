const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres", //your-postgre-susername
  password: "19971225", //your-postgre-password
  database: "TestData", //your-postgre-database-name
  host: "localhost", //postgres default host
  port: 5432, //postgres default port
});
module.exports = pool;
