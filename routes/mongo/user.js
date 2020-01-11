const Express = require("express");
const UserServices = require("../../services/mongo/UserServices");
const Service = new UserServices();

module.exports = (app, BASE_URL) => {
  const router = Express.Router();
  const path = `/${BASE_URL}/user`;
  app.use(path, router);

  router.get("/", async (req, resp, next) => {
    try {
      const data = await Service.getUser({});
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.get("/:id", async (req, resp, next) => {
    try {
      const data = await Service.getUserById(req.params.id);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.post("/", async (req, resp, next) => {
    try {
      console.log(req.body);
      const data = await Service.createUser(req.body);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.put("/:id", async (req, resp, next) => {
    try {
      const data = await Service.updateUser(req.params.id, req.body);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.delete("/:id", async (req, resp, next) => {
    try {
      const data = await Service.deleteUser(req.params.id);
      resp.status(200).json(data);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });
};
