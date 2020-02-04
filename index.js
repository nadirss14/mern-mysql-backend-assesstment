const Express = require("express");
const session = require("express-session");
const app = new Express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { config } = require("./config/environment");
const Jobs = require("./jobs/index");
const executeJobs = new Jobs();
const URL_BASE = `${config.API_BASE}/${config.API_VERSION}`;

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "chocolate dark"
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1;
  res.status(200).json({ hello: "world", counter: req.session.count });
});

require("./routes/mongo/userRoutes")(app, URL_BASE);
require("./routes/mongo/projectRoutes")(app, URL_BASE);
require("./routes/mongo/AgentRoutes")(app, URL_BASE);
require("./routes/mysql/agentRoutes")(app, URL_BASE);
require("./routes/default")(app);

//executeJobs.getAllAgentsFromMySql();

app.listen(config.PORT, () => {
  //const debug = require('debug')('app:server');
  console.log(`Listening http://localhost:${config.PORT}/${URL_BASE}/`);
});
