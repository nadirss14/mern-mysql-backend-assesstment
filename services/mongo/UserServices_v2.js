const mongoose = require("mongoose");
const MongoseLib = require("../../config/mongo/mongoose");
const User = require("../../model/user.model");
class UserServices {
  constructor() {
    this.collection = "users";
    this.mongoDB = new MongoLib();
  }

  async getUser({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const User = await this.mongoDB.getAll(this.collection, query);
    return User || [];
  }

  async getUserById({ UserId }) {
    const User = await this.mongoDB.get(this.collection, UserId);
    return User || [];
  }

  async createUser(user) {
    const createUserId = await this.mongoDB.create(this.collection, {
      user
    });
    return createUserId;
  }

  async updateUser(UserId, user) {
    console.log(user, typeof user);
    const originalUser = await this.mongoDB.get(UserId);

    const updateUserId = await this.mongoDB.update(
      this.collection,
      UserId,
      user
    );
    return updateUserId;
  }

  async deleteUser(UserId) {
    const deletedUserId = await this.mongoDB.delete(this.collection, UserId);
    return deletedUserId;
  }
}

module.exports = UserServices;
