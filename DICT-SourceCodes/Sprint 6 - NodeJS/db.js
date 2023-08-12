const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres", //your-postgre-susername
  password: "1234", //your-postgre-password
  database: "database-sample", //your-postgre-database-name
  host: "localhost", //postgres default host
  port: 5432, //postgres default port
});
module.exports = pool;
