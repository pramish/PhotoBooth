const express = require("express");
const router = express.Router();
const feedController = require("./feeds.controller");

router
  .route("/")
  .get(feedController.getAllFeeds)
  .post(feedController.uploadImage, feedController.createFeed)
  .delete();

router
  .route("/:imageId")
  .get(feedController.getOneFeed)
  .delete(feedController.deleteFeed);

module.exports = router;
