const mongoose = require("mongoose");
const feedsSchema = mongoose.Schema(
  {
    image: {
      type: JSON,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
      // required: true
    },
    category: {
      type: String
      // required: true
    },
    views: {
      type: Number,
      default: 0
    },
    emoji: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Emoji'
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feed"
        // type: Number
        // ref: 'Feed'
      }
    ],
    initial: {
      type: Boolean,
      default: false,
      require: true
    }
    // emoji :- Naya model banaune ra tyeslai object id bata reference garne done
    // timestamps done
    // user :-current user done
    // category done
    // views done
    // comments:feeds lai nai reference garne done
  },
  { timestamps: true }
);

module.exports = Feed = mongoose.model("Feed", feedsSchema);
