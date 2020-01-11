const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config");

// El encodeURIComponent garantiza que los caracteres especiales viajen sin problemas en la configuracion
const USER = encodeURIComponent(config.DB_USER);
const PASSWORD = encodeURIComponent(config.DB_PASSWORD);
const DB_NAME = config.DB_NAME;

console.log(
  `mongodb+srv://${USER}:${PASSWORD}@${config.DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

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
          console.log("Conectado exitosamente");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  // eslint-disable-next-line no-unused-vars
  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find()
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    // const _data = { _id: ObjectId(), ...data };
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  update(collection, id, data) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    });
  }

  delete(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: ObjectId(id) });
    });
  }
}

module.exports = MongoLib;
