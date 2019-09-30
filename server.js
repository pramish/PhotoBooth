const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

require("dotenv").config();

const connect = require("./config/db");
const router = require("./routes");

require("./services/cloudinary");
require("./config/passport")(passport);

const app = express();
// Connects to MongoDB
connect();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(passport.initialize());

app.use("/", router);

// Assume 404 since no routes and middlewares responded
app.use((req, res, next) => {
  console.log("error (404)");
  res.json({ Error: 404 });
});

module.exports = app;
