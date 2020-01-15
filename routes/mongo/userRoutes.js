const Express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserServices = require("../../services/mongo/UserService");
const Service = new UserServices();

module.exports = (app, BASE_URL) => {
  const router = Express.Router();
  const path = `/${BASE_URL}/user`;

  app.use(path, router);
  router.post("/login", async (req, resp, next) => {
    try {
      const data = await Service.Login(req.body);
      let authUser = {};
      if (data.length > 0) {
        console.log(data);
        authUser = JSON.parse(JSON.stringify(data[0]), (k, v) => {
          if (k === "password") {
            return "";
          }
          return v;
        });
      }
      resp.status(200).json(authUser);
    } catch (error) {
      console.log(`Error in ${path}${req.url} : ${error.message}`);
    }
  });

  router.get("/", async (req, resp, next) => {
    try {
      const data = await Service.getAll();
      let authUser = {};
      if (data.length > 0) {
        console.log(data);
        authUser = JSON.parse(JSON.stringify(data[0]), (k, v) => {
          if (k === "password") {
            return "";
          }
          return v;
        });
      }
      resp.status(200).json(authUser);
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
      console.log(req.body);
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
