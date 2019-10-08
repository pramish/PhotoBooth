const express = require("express");
const passport = require("passport");
const feedController = require("./feeds.controller");
const commentRouter = require("../comment/comment.router");
const emojiRouter = require("../emoji/emoji.router");

const router = express.Router();

router
  .route("/")
  .get(feedController.getAllFeeds)
  .post(
    passport.authenticate("jwt", { session: false }),
    feedController.uploadImage,
    feedController.createFeed
  );

router
  .route("/:id")
  .get(feedController.getOneFeed)
  .delete(
    passport.authenticate("jwt", { session: false }),
    feedController.isRightUser,
    feedController.deleteOneFeed
  );

router.use("/comment", commentRouter);
router.use("/emoji", emojiRouter);

module.exports = router;
