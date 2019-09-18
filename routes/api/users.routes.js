
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const upload = require('../../config/services/imageUpload');

const singleUpload = upload.single('image'); // this will allow users to upload the image once at a time.
//Load all the validation
const registerValidation = require("../../validation/register.validation");
const loginValidation = require("../../validation/login.validation");

//Load the User model
const User = require("../../models/users.model");

//@routes POST api/users/register
//@desc Register user
//@access Public

router.post("/register", async (req, res) => {
  //Validate users first

  try {
    // const { errors, isValid } = registerValidation(req.body);

    //If there is any errors while validating then send that errors to front end.
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

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
        res.json(newUser);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// @routes POST api/users/login
// @desc Login user and return JWT token
// @access public

router.post("/login", async (req, res) => {
  //Validating the user
  try {

    const { errors, isValid } = loginValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not registered" });
    }
    // IF the user is found and comparing the hashed password with it.
    // const isMatch = await bcrypt.compare(req.body.password, user.password);

    console.log(req.body.password);

    // if (isMatch) {
    //Creating the JWT payload
    const jwtPayload = {
      id: user.id,
      name: user.name
    };

    //Verify the token
    jwt.sign(payload, keys.secret, {
      expiresIn: 1800 //expires the jwt into half an hour
    });
    // }
    // else {
    return res
      .status(400)
      .json({ passwordIncorrect: 'password does not match' });
    // }

  } catch (error) {}
});

//Uploading the image to Amazon s3
router.post('/upload', (req, res) => {
  singleUpload(req, res, err => {
    res.json({
      imageLocation: req.file.location //Using this image location to get the required image in front end
    });
  });
});

module.exports = router;
