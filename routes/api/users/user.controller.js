const User = require("./users.model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const updateValidation = require("../../../utils/validation/update.validation");
// const loginValidation = require("../../../utils/validation/login.validation");


//@routes POST api/users/deleteUsers
//@desc Delete one user by email
//@access Private
const deleteUser = async (req, res, next) => {
  try {
    const result = await User.findOneAndDelete({ email: req.body.email });
    if (result) {
      return res.status(200).json({ success: "User deleted" });
    }
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

//@routes POST api/users/updateUser
//@desc Update one user by email
//@access Private
const updateUser = async (req, res, next) => {
  const toUpdate = Object.keys(req.body);
  const allowedUpdate = ["name", "email", "password"];
  const isValidOperation = toUpdate.every(update => {
    //This will determine the each value to be updated
    allowedUpdate.includes(update);
  });

  try {
    const { errors, isValid } = updateValidation(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "No such user found!" }); // throw error when the user is not found
    }
    toUpdate.forEach(update => {
      user[update] = req.body[update]; //Update the users information as per indicated
    });
    // await user.save(); //save the user to the database
    await user.updateOne();
    res.json({ success: "User has been successfully updated" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOneUser = async (req, res, next) => {
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
};

module.exports = {
  deleteUser,
  getOneUser,
  updateUser
  // createUser,
  // authenticateUser
};
