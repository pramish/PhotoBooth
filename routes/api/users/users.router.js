const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.route('/register').post(userController.createUser);
router.route('/login').post(userController.authenticateUser);

router
  .route('/')
  .get(userController.getOneUser)
  .delete(userController.deleteUser)
  .post(userController.updateUser);

module.exports = router;
