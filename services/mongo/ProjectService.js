const mongoose = require("mongoose");
const { config } = require("../../config/environment");
const Project = require("../../model/project.model");
const MONGO_URI = require("../../config/mongo/mongoose");

class ProjectService {
  constructor() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  getAll() {
    return Project.find()
      .then(item => {
        console.log(item);
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }
  getById(id) {
    return User.findById(id)
      .then(item => {
        console.log(item);
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }

  create(data) {
    let newProject = new Project({ project: { ...data } });
    return newProject
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
    return Project.findByIdAndUpdate(
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
    return Project.findByIdAndDelete(id)
      .then(item => {
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }
}
module.exports = ProjectService;
