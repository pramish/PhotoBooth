const Feed = require("../feeds/feeds.model");
const uuid = require("uuid/v4");

const toggleEmoji = async (req, res, next) => {
  try {
    // Get the feed by the param id
    const feed = await Feed.findById(req.params.id);

    // Check to see if user already emojify the feed
    if (
      feed.emoji.filter(emo => emo.user.toString() === req.user.id).length > 0
    ) {
      // Search the emoji Id that is to be deleted
      let emojiId = feed.emoji.filter(emo => {
        if (emo.user.toString() === req.user.id) {
          return emo;
        }
      });
      let actualEmojiId = emojiId[0].id;
      // Get the remove index
      const removeIndex = feed.emoji
        .map(emoji => emoji.id.toString())
        .indexOf(actualEmojiId);

      //Splice comment out of that comments array
      feed.emoji.splice(removeIndex, 1);

      // Update the new feed
      const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
        new: true
      });

      res.status(201).json(updatedFeed);
    } else {
      // Create new emoji
      const newEmoji = {
        id: uuid(),
        emojiType: req.body.type,
        user: req.user.id
      };

      // Add new emoji to the feeds/emoji array
      feed.emoji.unshift(newEmoji);
      const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
        new: true
      });

      res.status(201).json(updatedFeed);
    }
  } catch (error) {
    res.status(501).json(error);
  }
};

module.exports = {
  toggleEmoji
};
