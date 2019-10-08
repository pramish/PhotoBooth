const mongoose = require("mongoose");

require("dotenv").config();

const connect = () => {
  mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log(
        `Connected to MONGODB and Node ENV = ${process.env.NODE_ENV}`
      );
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports = connect;
