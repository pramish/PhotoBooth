const Feed = require("../feeds/feeds.model");
const Emoji = require("../emoji/emoji.model");
const User = require("../users/users.model");

const toggleEmoji = async (req, res, next) => {
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
      // Also delete that emoji object from Database
      const responseOfDeletion = await Emoji.findByIdAndDelete(actualEmojiId);
      res.status(201).json(updatedFeed);
    } else {
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
};

module.exports = {
  toggleEmoji
};
