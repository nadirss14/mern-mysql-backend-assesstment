const Express = require("express");
const Service = require("../../services/mysql/AgentServices");
const bodyParser = require("body-parser");
const cors = require("cors");

// const PortfolioServices = require('../services/portfolioService');
// const Services = new PortfolioServices();
// const { cacheResponse } = require('../util/cacheResponse');
// const {
//   FIVE_MINUTES_IN_SECONDS,
//   // eslint-disable-next-line no-unused-vars
//   SIXTY_MINUTES_IN_SECONDS
// } = require('../util/time');

module.exports = (app, BASE_URL) => {
  const router = Express.Router();
  app.use(`/${BASE_URL}/data`, router);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  router.get("/", async (req, resp, next) => {
    try {
      const data = await Service.getAllAgents();
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error en ${req.url}: ${error}`);
    }
  });

  router.put("/", async (req, resp, next) => {
    try {
      console.log(req.body);
      const data = await Service.updateAgent(req.body);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error en ${req.url}: ${error}`);
    }
  });
};
