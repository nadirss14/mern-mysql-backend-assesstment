const Express = require("express");
const Service = require("../services/AgentServices");

// const PortfolioServices = require('../services/portfolioService');
// const Services = new PortfolioServices();
// const { cacheResponse } = require('../util/cacheResponse');
// const {
//   FIVE_MINUTES_IN_SECONDS,
//   // eslint-disable-next-line no-unused-vars
//   SIXTY_MINUTES_IN_SECONDS
// } = require('../util/time');

module.exports = (app, BASE_URL, Router) => {
  const router = Router;
  app.use(`/${BASE_URL}/agents`, router);

  router.get("/", async (req, resp, next) => {
    try {
      const data = await Service.getAgents();
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error en ${req.url}: ${error}`);
    }
  });
};
