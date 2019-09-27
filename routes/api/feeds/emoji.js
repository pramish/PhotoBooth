const mongoose = require('mongoose');

const emojiSchema = mongoose({
  emojiType: {
    type: String
  },
  user: {
    type: String
  },
  feed: {
    type: String
  }
});

module.exports = Emoji = mongoose.model('Emoji', emojiSchema);
