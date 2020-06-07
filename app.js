const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./config/database');
const routes = require('./routes/index.routes');
const errorHandlingJWT = require('./middlewares/errorHandlingJWT');

db.connect()
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const app = express();

app.use(logger('dev'));
app.use(cors({
  exposedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Accept-Language", "Authorization"],
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);
app.use(errorHandlingJWT);

module.exports = app;
