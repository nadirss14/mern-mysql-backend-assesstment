const mysql = require("mysql");
const {
  CONNECTION_LIMIT,
  HOST,
  USER,
  PASSWORD,
  DATA_BASE
} = require("./configMySql");

const connection = mysql.createConnection({
  host: HOST,
  // port: config.DB_PORT_MYSQL,
  user: USER,
  password: PASSWORDL,
  database: DATA_BASE
});

// connection.connect();

// connection.query("SELECT 1 + 1 AS solution", function(error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results[0].solution);
// });

// connection.end();

if (connection) {
  connection.connect();
  console.info(
    `La conexión de la base de datos fue aceptada. State = ${connection.state}. \n 
      Ingrese a la url http://localhost:${config.PORT}/`
  );
  connection.end();
}

module.exports = connection;
