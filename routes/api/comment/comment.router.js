const express = require("express");
const passport = require("passport");
const { addNewComment, deleteThatComment } = require("./comment.controller");

const router = express.Router();

/**
 * @route         POST feeds/comment/:id
 * @description   Post new comment in feeds with feed id = id
 * @access        protected
 */
router
  .route("/:id")
  .post(passport.authenticate("jwt", { session: false }), addNewComment);

/**
 * @route         DELETE feeds/comment/:id/:commentId
 * @description   Delete comment from feed
 * @access        protected
 */
router
  .route("/:id/:commentId")
  .delete(passport.authenticate("jwt", { session: false }), deleteThatComment);

module.exports = router;
