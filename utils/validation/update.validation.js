const validator = require("validator");
const isEmpty = require("is-empty");

/**
 * @description Responsible for validating login form
 * @param {object} data This object contains keys and values that is to
 * be validated
 */
module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Converting the empty fields into the empty strings
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //Validate name
  if (validator.isEmpty(data.name)) {
    errors.name = "Name Field cannot be empty";
  }
  //Validate email
  if (validator.isEmpty(data.email)) {
    errors.email = "Email Field cannot be empty";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  //Validate password
  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field cannot be empty";
  }

  if (!validator.isLength(data.password, { min: 6, max: 16 })) {
    errors.password = "Passwords must be in the range of 6 to 16 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Password Field cannot be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
