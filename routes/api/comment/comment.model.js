const mongoose = require('mongoose');
const commentSchema = mongoose.Schema(
  //defining the comments model as image, user, emoji, replies and feeds
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    image: {
      type: String,
      require: true
    },
    emoji: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emoji'
      }
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    feed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feed',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = Comment = mongoose.model('Comment', commentSchema);
