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
  .route('/comments/:imageId')
  // .route('/comments')
  .get(feedController.getOneFeed)
  .post(feedController.postComments)
  .delete(/*feedController.confirmDelete,*/ feedController.deleteFeed);

module.exports = router;
