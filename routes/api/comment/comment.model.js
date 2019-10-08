const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    image: {
      type: JSON,
      require: true
    },
    emoji: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emoji"
      }
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    commentFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feed",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = Comment = mongoose.model("Comment", commentSchema);
