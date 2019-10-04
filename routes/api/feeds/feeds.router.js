const express = require('express');
const router = express.Router();
const feedController = require('./feeds.controller');

router
  .route('/')
  .get(feedController.getAllFeeds)
  .post(
    // feedController.detectImage,
    feedController.uploadImage,
    feedController.createFeed
  )
  .delete();

router
  .route('/:imageId')
  // .route('/hello')
  .get(feedController.getOneFeed)
  .post(feedController.postComments)
  .delete(feedController.deleteFeed, feedController.deleteFeed);

module.exports = router;
