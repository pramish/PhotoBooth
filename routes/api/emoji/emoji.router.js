const express = require("express");
const passport = require("passport");

const { toggleEmoji } = require("./emoji.controller.js");

const router = express.Router();

/**
 * @route POST feeds/emoji/:id
 * @description Emojify that feed with id
 * @access protected
 */
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  toggleEmoji
);

module.exports = router;
