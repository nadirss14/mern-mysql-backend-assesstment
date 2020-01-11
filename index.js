const Express = require("express");
const app = new Express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { config } = require("./config/environment");
const Jobs = require("./jobs/index");
const executeJobs = new Jobs();
const URL_BASE = `${config.API_BASE}/${config.API_VERSION}`;
const Router = Express.Router();

// const {
//   logErrors,
//   wrapErrors,
//   errorHandler
// } = require('./util/middleware/errorHandlers.js');

// const notFoundHandler = require('./util/middleware/notFountHandler.js');

require("./routes/index")(app, URL_BASE, Router);
require("./routes/default")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

executeJobs.getAllUser();

// app.use(notFoundHandler);
// //Manejadores de Errores
// app.use(logErrors);
// app.use(wrapErrors);
// app.use(errorHandler);

app.listen(config.PORT, () => {
  //const debug = require('debug')('app:server');
  console.log(`Listening http://localhost:${config.PORT}/${URL_BASE}/`);
});
