const { config } = require("../environment");
const USER = encodeURIComponent(config.DB_USER_MONGO);
const PASSWORD = encodeURIComponent(config.DB_PASSWORD_MONGO);
const DB_NAME = encodeURIComponent(config.DB_NAME_MONGO);
const DB_HOST = encodeURIComponent(config.DB_HOST_MONGO);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = MONGO_URI;
