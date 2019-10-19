const express = require('express');
const passport = require('passport');
const feedController = require('./feeds.controller');
const commentRouter = require('../comment/comment.router');
const emojiRouter = require('../emoji/emoji.router');
const Feed = require('./feeds.model');

const router = express.Router();

//api for getting all feeds, uploading the image and creatig the feeds
router
  .route('/')
  .get(feedController.getAllFeeds)
  .post(
    passport.authenticate('jwt', { session: false }),
    feedController.uploadImage,
    feedController.createFeed
  );

router
  .route('/:id')
  .get(feedController.getOneFeed) //getting one feed
  .put(
    passport.authenticate('jwt', { session: false }),
    feedController.isRightUser, //authenticating the user
    feedController.checkDeletionCriteria, //checking the deletion criteria
    feedController.updateOneFeed //updating the feeds
  )

  //api for getting one feed with it's id, authenticating the user, checking the deletion criteria and updating the feeds.
  .delete(
    passport.authenticate('jwt', { session: false }),
    feedController.isRightUser, //authenticating the user
    feedController.checkDeletionCriteria, //checking the deletion criteria
    feedController.deleteOneFeed //deleting one feed
  );
// router.route("/findByUserId/:id").get(async (req, res, next) => {
//   console.log(req.params.id);

//   let feeds = await Feed.find({ user: req.params.id });
//   res.json(feeds);
// });

// router.route("/:imageId").post(feedController.countViews);

router.use('/comment', commentRouter); //using the comment router
router.use('/emoji', emojiRouter); //using the emoji router

module.exports = router;
