const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../environment");

const USER = encodeURIComponent(config.DB_USER_MONGO);
const PASSWORD = encodeURIComponent(config.DB_PASSWORD_MONGO);
const DB_NAME = encodeURIComponent(config.DB_NAME_MONGO);
const DB_HOST = encodeURIComponent(config.DB_HOST_MONGO);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

console.log(MONGO_URI);

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(error => {
          if (error) {
            reject(error);
          }
          console.log("Conectado exitosamente a mongoDB");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  getAll(collection, query) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .find()
          .toArray();
      })
      .catch(error => {
        console.log(`Error in getAll() in to the mongo.js : ${error.message}`);
      });
  }

  get(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).findOne({ _id: ObjectId(id) });
      })
      .catch(error => {
        console.log(`Error in get() in to the mongo.js : ${error.message}`);
      });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .catch(error => {
        console.log(`Error in create() in to the mongo.js : ${error.message}`);
      });
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .catch(error => {
        console.log(`Error in update() in to the mongo.js : ${error.message}`);
      });
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .catch(error => {
        console.log(`Error in delete() in to the mongo.js : ${error.message}`);
      });
  }
}

module.exports = MongoLib;
