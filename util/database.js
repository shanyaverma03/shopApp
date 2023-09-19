const mongodb = require("mongodb");
let dotenv = require("dotenv");

const MongoClient = mongodb.MongoClient;

dotenv.config();

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_CONNECT)
    .then((client) => {
      console.log("connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

//return access to the connected db
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "NO DATABASE FOUND";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
