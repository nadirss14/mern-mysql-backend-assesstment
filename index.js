const Express = require("express");
const app = new Express();
const { config } = require("./config/index");
const bodyParser = require("body-parser");
const cors = require("cors");

// const {
//   logErrors,
//   wrapErrors,
//   errorHandler
// } = require('./util/middleware/errorHandlers.js');

// const notFoundHandler = require('./util/middleware/notFountHandler.js');

require("./routes/index")(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use(notFoundHandler);
// //Manejadores de Errores
// app.use(logErrors);
// app.use(wrapErrors);
// app.use(errorHandler);

app.listen(config.PORT, () => {
  //const debug = require('debug')('app:server');
  console.log(`Listening http://localhost:${config.PORT}`);
});
