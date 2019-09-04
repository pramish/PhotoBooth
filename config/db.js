const mongoose = require('mongoose');
const MONGOURI = require('./keys').MONGOURI;
mongoose
  .connect(MONGOURI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MONGODB!!');
  })
  .catch(e => {
    console.log(e);
  });
