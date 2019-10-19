const express = require('express'); //importing the express library
const router = express.Router(); //creating the router from express
const userController = require('./user.controller'); //importing the user controller

router
  .route('/')
  .get(userController.getOneUser) //getting one user
  .delete(userController.deleteUser) //delete one user
  .post(userController.updateUser); //update one user

module.exports = router;
