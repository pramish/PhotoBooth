const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function loginValidation(data) {
  let errors = {};

  //Converting the empty fields into the empty strings
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  //Validate email
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email Field cannot be empty';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  //Validate password
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password Field cannot be empty';
  }
  //validate the length of the password
  if (!validator.isLength(data.password, { min: 6, max: 16 })) {
    errors.password = 'Passwords must be in the range of 6 to 16 characters';
  }

  //returning the errors and the validation checker
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
