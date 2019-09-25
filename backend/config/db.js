const mongoose = require('mongoose');
const MONGOURI = require('./keys').MONGOURI;
mongoose
  .connect(MONGOURI, { useNewUrlParser: true,useCreateIndex:true })
  .then(() => {
    console.log('Connected to MONGODB!!');
  })
  .catch(e => {
    console.log(e);
  });
