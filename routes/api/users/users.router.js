const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
//Load all the validation
const registerValidation = require("../../../utils/validation/register.validation");
const loginValidation = require("../../../utils/validation/login.validation");
//Load the User model
const User = require("./users.model");

//@routes POST api/users/register
//@desc Register user
//@access Public
router.post("/register", async (req, res) => {
  //Validate users first
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
        res.json(newUser);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// @routes POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
  //Validating the user
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

    if (isMatch) {
      //Creating the JWT payload
      const jwtPayload = {
        id: user.id,
        name: user.name
      };

      console.log(jwtPayload);

      //Verify the token
      jwt.sign(payload, keys.secret, {
        expiresIn: 1800 //expires the jwt into half an hour
      });
      res.json({
        email: user.email,
        name: user.name
      });
    } else {
      return res
        .status(400)
        .json({ passwordIncorrect: "password does not match" });
    }
  } catch (error) {
    res.json({
      error: error
    });
  }
});

//@routes POST api/users/deleteUsers
//@desc Delete one user by email
//@access Private
router.post("/deleteuser", async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ email: req.body.email });
    if (result) {
      return res.status(200).json({ success: "User deleted" });
    }
    if (!result) {
      return res.status(200).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
//@routes POST api/users/updateUser
//@desc Update one user by email
//@access Private
router.patch("/updateuser", async (req, res) => {
  const toUpdate = Object.keys(req.body);
  const allowedUpdate = ["name", "email", "password"];
  const isValidOperation = toUpdate.every(update => {
    //This will determine the each value to be updated
    allowedUpdate.includes(update);
  });

  try {
    const { errors, isValid } = registerValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "No such user found!" }); // throw error when the user is not found
    }
    toUpdate.forEach(update => {
      user[update] = req.body[update]; //Update the users information as per indicated
    });
    await user.save(); //save the user to the database
    await user.updateOne();
    res.json({ success: "User has been successfully updated" });
  } catch (error) {
    res.status(500).send(error);
  }
});

//@routes GET api/users/readuser
//@desc Read the user based on provided email
//@access Private

router.get("/getuser", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }
    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(500).json({
      error: "Server is down"
    });
  }
});

module.exports = router;
