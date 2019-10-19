const User = require("../routes/api/users/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerValidation = require("../utils/validation/register.validation");
const loginValidation = require("../utils/validation/login.validation");

/**
 * @route  POST /register
 * @description Function responsible for creating  new user
 * @access public
 */
const createUser = async (req, res, next) => {
  try {
    const { errors, isValid } = registerValidation(req.body);
    // If there is any errors while validating then send that errors to front end.
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Checking up the user before registering to the database
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "User is already registered!!" });
    }
    //Getting all the users credentials
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    //Hashing the user password before saving to the database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err2, hashPassword) => {
        if (err) throw err;
        newUser.password = hashPassword;
        //Saving the user
        newUser.save();
        res.json({
          email: newUser.email,
          name: newUser.name
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route  POST /login
 * @description Function responsible for authenticating the user
 * @access public
 */
const authenticateUser = async (req, res, next) => {
  try {
    const { errors, isValid } = loginValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not registered" });
    }
    // IF the user is found and comparing the hashed password with it.
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(isMatch);

    if (isMatch) {
      //Creating the JWT payload
      const jwtPayload = {
        id: user.id,
        name: user.name
      };

      console.log(jwtPayload);

      // Verify the token
      var token = jwt.sign(jwtPayload, "secretOrKey", {
        expiresIn: 1800 //expires the jwt into half an hour
      });
      res.json({ token: token, email: user.email, name: user.name }); //Passing the token and the user to the front end
    } else {
      res.status(400).json({ passwordIncorrect: "Password does not match" });
    }
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
};

module.exports = {
  createUser,
  authenticateUser
};
