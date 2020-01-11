const Express = require("express");
// const PortfolioServices = require('../services/portfolioService');
// const Services = new PortfolioServices();
// const { cacheResponse } = require('../util/cacheResponse');
// const {
//   FIVE_MINUTES_IN_SECONDS,
//   // eslint-disable-next-line no-unused-vars
//   SIXTY_MINUTES_IN_SECONDS
// } = require('../util/time');

module.exports = app => {
  const router = Express.Router();

  app.use("/login", router);

  router.get("/", (req, resp, next) => {
    try {
      const login = { mesaje: "hello!!" };
      resp.status(200).json(login);
    } catch (error) {
      next(error);
    }
  });
};
