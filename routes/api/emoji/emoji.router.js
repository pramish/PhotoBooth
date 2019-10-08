const express = require("express");
const passport = require("passport");

const router = express.Router();
const Feed = require("../feeds/feeds.model");
const Emoji = require("../emoji/emoji.model");
const User = require("../users/users.model");

/**
 * @route POST feeds/emoji/:id
 * @description Emojify that feed with id
 * @access protected
 */
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const feed = await Feed.findById(req.params.id);
      let emojiId = feed.emoji.filter(async emo => {
        const emoRes = await Emoji.findById(emo);
        if (
          emoRes.user.toString() === req.user.id &&
          emoRes.feed === req.params.id
        ) {
          return emo;
        }
      });
      let actualEmojiId = emojiId[0];

      // Check to see if user already emojify the feed
      if (
        feed.emoji.filter(async emo => {
          const emoRes = await Emoji.findById(emo);
          return (
            emoRes.user.toString() === req.user.id &&
            emoRes.feed === req.params.id
          );
        }).length > 0
      ) {
        // Get the remove index
        const removeIndex = feed.emoji
          .map(emojiId => emojiId.toString())
          .indexOf(actualEmojiId);

        //Splice comment out of that comments array
        feed.emoji.splice(removeIndex, 1);

        const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
          new: true
        });
        console.log("Hya ayo?", updatedFeed);

        // Also delete that emoji object from Database
        const responseOfDeletion = await Emoji.findByIdAndDelete(actualEmojiId);

        res.status(201).json(updatedFeed);
      } else {
        console.log("Ayo?");

        // Create new emoji
        const newEmoji = new Emoji({
          emojiType: "haha",
          user: req.user.id,
          feed: req.params.id
        });

        const emojRes = await newEmoji.save();
        // Add new emoji to the feeds/emoji array
        feed.emoji.unshift(emojRes._id);

        const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
          new: true
        });

        res.status(201).json(updatedFeed);
      }
    } catch (error) {
      res.status(501).json({ message: "Error" });
    }
  }
);

// /**
//  * @route         DELETE feeds/unemoji/:id
//  * @description   Delete emoji from feed
//  * @access        protected
//  */

// router
//   .route("unemoji/:id")
//   .delete(
//     passport.authenticate("jwt", { session: false }),
//     async (req, res, next) => {
//       const feed = await Feed.findById(req.params.id);
//       // Check if comment exits of=r not
//       if (
//         feed.comments.filter(
//           comment => comment.toString() === req.params.commentId
//         ).length === 0
//       ) {
//         return res.status(404).json({ commentnotfound: "No comment found" });
//       }
//       // Get the removal index
//       const removeIndex = feed.comments
//         .map(commentId => commentId.toString())
//         .indexOf(req.params.commentId);

//       //Splice comment out of that comments array
//       feed.comments.splice(removeIndex, 1);
//       const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
//         new: true
//       });
//       res.status(201).json(updatedFeed);
//     }
//   );

module.exports = router;
