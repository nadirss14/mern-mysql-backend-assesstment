const mongoose = require("mongoose");
const { config } = require("../../config/environment");
const Agent = require("../../model/agent.model");
const MONGO_URI = require("../../config/mongo/mongoose");
const ServiceMysql = require("../../services/mysql/AgentServices");

class AgentService {
  constructor() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  getAll() {
    return Agent.find()
      .then(item => {
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }

  getById(id) {
    return Agent.findById(id)
      .then(item => {
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }

  create(data) {
    let newAgent = new Agent({ agent: { ...data } });
    return newAgent
      .save()
      .then(item => {
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }

  update(id, data) {
    return Agent.findByIdAndUpdate(
      id,
      { $set: data },
      { useFindAndModify: false }
    )
      .then(item => {
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }

  delete(id, data) {
    return Agent.findByIdAndDelete(id)
      .then(item => {
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }

  clearData() {
    return Agent.deleteMany({})
      .then(item => {
        console.log("Clear Data Mongo");
        return ServiceMysql.clearData()
          .then(item => {
            console.log("Clear Data Mysql");
            return "Clear Data";
          })
          .catch(error => {
            return error.message();
          });
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }
}
module.exports = AgentService;
