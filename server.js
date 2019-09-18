const express = require("express");
require("./config/db");
const mongo = require("./config/keys").MONGOURI;
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const userRouter = require('./routes/api/users.routes');
const passport = require('passport');
const cors = require('cors');


const app = express();


app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

//using the passport middleware
app.use(passport.initialize());

require("./config/passport")(passport);

//Configure the passport

//Routes for the users

app.use(cors());
app.use('/api/users', userRouter);


app.listen(port, () => {
  console.log(`Server is connected to port ${port}`);
});
