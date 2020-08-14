const mongoose = require('mongoose');

require('dotenv').config();

const connect = () => {
  //connecting to the mongoose
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(
        `Connected to MONGODB and Node ENV = ${process.env.NODE_ENV}`
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connect;
