const { config } = require("../environment");
const mysql = require("mysql");
// const {
//   CONNECTION_LIMIT,
//   HOST,
//   USER,
//   PASSWORD,
//   DATA_BASE
// } = require("./configMySql");

// const pool = mysql.createPool({
//   connectionLimit: CONNECTION_LIMIT,
//   host: HOST,
//   // port: config.DB_PORT_MYSQL,
//   user: USER,
//   password: PASSWORD,
//   database: DATA_BASE
// });

const pool = mysql.createPool({
  connectionLimit: encodeURIComponent(config.DB_CONNECTION_LIMIT_MYSQL),
  host: encodeURIComponent(config.DB_HOST_MYSQL),
  // port: config.DB_PORT_MYSQL,
  user: encodeURIComponent(config.DB_USER_MYSQL),
  password: encodeURIComponent(config.DB_PASSWORD_MYSQL),
  database: encodeURIComponent(config.DB_DATA_BASE_MYSQL)
});

pool.getConnection((error, connection) => {
  if (error) {
    switch (error.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("La conexión de la base de datos se cerró.");
        break;
      case "ER_CON_COUNT_ERROR":
        console.error("La base de datos tiene demasiadas conexiones.");
        break;
      case "ECONNREFUSED":
        console.error("La conexión de la base de datos fue rechazada.");
        break;
      case "ER_NOT_SUPPORTED_AUTH_MODE":
        console.error(
          "El cliente no admite el  protocolo de autenticacion solicitado por el servidor."
        );
        break;
      default:
        console.error(`Error no controlado: ${error.message}`);
        break;
    }
  }
  if (connection) {
    connection.release();
    console.info(
      `La conexión de la base de datos fue aceptada. State = ${connection.state}. \n 
      Ingrese a la url http://localhost:${config.PORT}/`
    );
  }
});

module.exports = pool;
