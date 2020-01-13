const Express = require("express");
const app = new Express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { config } = require("./config/environment");
const Jobs = require("./jobs/index");
const executeJobs = new Jobs();
const URL_BASE = `${config.API_BASE}/${config.API_VERSION}`;

// const {
//   logErrors,
//   wrapErrors,
//   errorHandler
// } = require('./util/middleware/errorHandlers.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// const notFoundHandler = require('./util/middleware/notFountHandler.js');
require("./routes/mongo/userRoutes")(app, URL_BASE);
require("./routes/mongo/projectRoutes")(app, URL_BASE);
require("./routes/mongo/AgentRoutes")(app, URL_BASE);
require("./routes/mysql/agentRoutes")(app, URL_BASE);
require("./routes/default")(app);

//executeJobs.getAllAgentsFromMySql();

// app.use(notFoundHandler);
// //Manejadores de Errores
// app.use(logErrors);
// app.use(wrapErrors);
// app.use(errorHandler);

app.listen(config.PORT, () => {
  //const debug = require('debug')('app:server');
  console.log(`Listening http://localhost:${config.PORT}/${URL_BASE}/`);
});
