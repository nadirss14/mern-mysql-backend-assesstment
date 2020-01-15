require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  PORT: process.env.PORT || 3008,
  API_VERSION: "v1",
  API_BASE: "api",
  CORS: "*",
  DB_HOST_MONGO: process.env.DB_HOST_MONGO,
  DB_USER_MONGO: process.env.DB_USER_MONGO,
  DB_PASSWORD_MONGO: process.env.DB_PASSWORD_MONGO,
  DB_NAME_MONGO: process.env.DB_NAME_MONGO,
  DB_HOST_MYSQL: process.env.DB_HOST_MYSQL,
  DB_DATA_BASE_MYSQL: process.env.DB_DATA_BASE_MYSQL,
  DB_USER_MYSQL: process.env.DB_USER_MYSQL,
  DB_PASSWORD_MYSQL: process.env.DB_PASSWORD_MYSQL,
  DB_PORT_MYSQL: process.env.DB_PORT_MYSQL,
  DB_CONNECTION_LIMIT_MYSQL: process.env.DB_CONNECTION_LIMIT_MYSQL
};

module.exports = { config };