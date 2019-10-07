const express = require("express");
const passport = require("passport");
const router = express.Router();

const Feed = require("../feeds/feeds.model");

router
  .route("/")
  .get()
  .post(
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const feed = Feed.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
        feedId: feed._id
      };
    }
  );

router
  .route("/:id")
  .get()
  .delete();
