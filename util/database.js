const mongodb = require("mongodb");
let dotenv = require("dotenv");

const MongoClient = mongodb.MongoClient;

dotenv.config();

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_CONNECT)
    .then((result) => {
      console.log("connected");
      callback(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
