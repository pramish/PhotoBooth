const mongoose = require("mongoose");
const feedsSchema = mongoose.Schema(
  {
    image: {
      type: JSON,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    emoji: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emoji"
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  { timestamps: true }
);

module.exports = Feed = mongoose.model("Feed", feedsSchema);
