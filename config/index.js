require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  PORT: process.env.PORT || 3008,
  API_VERSION: "v1",
  API_BASE: "api",
  CORS: "*",
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME
};

module.exports = { config };
