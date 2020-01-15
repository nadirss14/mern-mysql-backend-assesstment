const mongoose = require("mongoose");
const { config } = require("../../config/environment");
const User = require("../../model/user.model");
const MONGO_URI = require("../../config/mongo/mongoose");

class UserService {
  constructor() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  getAll() {
    return User.find()
      .then(item => {
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
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }
  Login(data) {
    console.log(`Este es el data ${JSON.stringify(data)}`);
    return User.find(data)
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
    let newUser = new User({ user: { ...data } });
    return newUser
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
    return User.findByIdAndUpdate(
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
    return User.findByIdAndDelete(id)
      .then(item => {
        return item;
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  }
}
module.exports = UserService;
