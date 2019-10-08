const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Converting the empty fields into the empty strings
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

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

  if (!validator.equals(data.password, data.password2)) {
    errors.password = "Password does not match";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Password Field cannot be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
