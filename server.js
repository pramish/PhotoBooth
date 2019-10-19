const express = require("express"); //express lbrary
const bodyParser = require("body-parser"); //body parser which is used to parse the object that we got from front end.
const passport = require("passport"); //used to get the token for user authentication
const cors = require("cors"); //providing a Connect/Express middleware
const fileupload = require("express-fileupload"); //used for uploading the image file
const path = require("path"); //path for image uploading

require("dotenv").config(); //configuring the env for the application

const connect = require("./config/db"); //requiring the database connection
const router = require("./routes"); //requiring the routes for the application

require("./services/cloudinary"); //requiring the cloudinary for uploading the images
require("./config/passport")(passport); //using passport to generate tokens

const app = express(); //creating the express object
// Connects to MongoDB
connect();

app.use(cors()); //using the cors library

app.use(
  //uisng the body-parser
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(
  //letting the application to upload the image file and giving temporary directory as tmp.
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

app.use(bodyParser.json()); //using body parser as json object

app.use(passport.initialize()); //initializing the passport

app.use("/", router);

// Assume 404 since no routes and middlewares responded
app.use((req, res, next) => {
  console.log("error (404)");
  res.json({ Error: 404 });
});

module.exports = app; //exporting app
