const mongoose = require("mongoose");
require("dotenv").config();

const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "27017";
const dbName = process.env.DB_DATABASE || "tickets_express";
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const connectionString = (dbUsername && dbPassword) ? `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin` : `mongodb://${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  connect: () => mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
  dbName,
  connectionString,
  connection: () => {
    if (mongoose.connection) {
      return mongoose.connection;
    }

    return this.connect();
  }
};
