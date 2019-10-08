const mongoose = require("mongoose");

const emojiSchema = mongoose.Schema({
  emojiType: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  feed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feed",
    required: true
  }
});

module.exports = Emoji = mongoose.model("Emoji", emojiSchema);
