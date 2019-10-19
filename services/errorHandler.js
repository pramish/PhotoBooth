//handling the errors and sending the errors as a String
const errorHandler = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(error.message || error.toString());
};

module.exports = errorHandler;
