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
    title: {
      type: String
    },
    views: {
      type: Number,
      default: 0
    },
    default: {
      type: Boolean,
      default: true
    },
    emoji: {
      type: Array,
      required: false
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feed"
      }
    ]
  },
  { timestamps: true }
);
// feedsSchema.index({ title: 'text', category: 'text' });

module.exports = Feed = mongoose.model("Feed", feedsSchema);
