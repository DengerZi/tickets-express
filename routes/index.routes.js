require("dotenv").config();
const express = require('express');

const app = express();

app.use(`${process.env.APP_URI + process.env.APP_VERSION}/roles`, require("./role.routes"));
app.use(`${process.env.APP_URI + process.env.APP_VERSION}/users`, require("./user.routes"));
app.use(`${process.env.APP_URI + process.env.APP_VERSION}/tickets`, require("./ticket.routes"));

module.exports = app;
