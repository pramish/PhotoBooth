const express = require("express");
const passport = require("passport");

const router = express.Router();

const Feed = require("../feeds/feeds.model");
// const Comment = require("../comment/comment.model");
const imgUploader = require("../../helpers/imgUploader");

/**
 * @route         POST feeds/comment/:id
 * @description   Post new comment in feeds with feed id = id
 * @access        protected
 */
router
  .route("/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      try {
        const feed = await Feed.findById(req.params.id);
        if (!feed) {
          res.status(404).json({
            error: "No such feed found"
          });
        } else {
          // const commentImgUrl = imgUploader(req.files.myImg);
          const newCommentFeed = new Feed({
            user: req.user._id,
            image:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg",
            feed: feed._id,
            default: false
          });
          const commtRes = await newCommentFeed.save();
          feed.comments.unshift(commtRes._id);
          const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
            new: true
          });

          res.status(201).json(updatedFeed);
        }
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );

/**
 * @route         DELETE feeds/comment/:id/:commentId
 * @description   Delete comment from feed
 * @access        protected
 */
router
  .route("/:id/:commentId")
  .delete(
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const feed = await Feed.findById(req.params.id);
      // Check if comment exits of=r not
      if (
        feed.comments.filter(
          comment => comment.toString() === req.params.commentId
        ).length === 0
      ) {
        return res.status(404).json({ commentnotfound: "No comment found" });
      }
      // Get the removal index
      const removeIndex = feed.comments
        .map(commentId => commentId.toString())
        .indexOf(req.params.commentId);

      //Splice comment out of that comments array
      feed.comments.splice(removeIndex, 1);

      const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
        new: true
      });
      res.status(201).json(updatedFeed);
    }
  );

module.exports = router;
