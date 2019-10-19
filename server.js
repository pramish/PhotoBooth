const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const fileupload = require("express-fileupload");
const path = require("path");

//configuring the env for the application
require("dotenv").config();

// Connect function helps to connect to the mongoDB
const connect = require("./config/db");
const router = require("./routes");

require("./services/cloudinary");
require("./config/passport")(passport);

const app = express();

connect();

app.use(cors());

// Using bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//letting the application to upload the image file and giving temporary directory as tmp.
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

app.use(passport.initialize());

app.use("/", router);

// Assume 404 since no routes and middlewares responded
app.use((req, res, next) => {
  console.log("error (404)");
  res.json({ Error: 404 });
});

module.exports = app;
