const Express = require("express");
const AgentService = require("../../services/mongo/AgentService");
const Service = new AgentService();

module.exports = (app, BASE_URL) => {
  const router = Express.Router();
  const path = `/${BASE_URL}/agent`;
  app.use(path, router);

  router.get("/", async (req, resp, next) => {
    try {
      const data = await Service.getAll();
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.get("/:id", async (req, resp, next) => {
    try {
      const data = await Service.getById(req.params.id);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.post("/", async (req, resp, next) => {
    try {
      const data = await Service.create(req.body);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.put("/:id", async (req, resp, next) => {
    try {
      const data = await Service.update(req.params.id, req.body);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.delete("/:id", async (req, resp, next) => {
    try {
      const data = await Service.delete(req.params.id);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });
};
