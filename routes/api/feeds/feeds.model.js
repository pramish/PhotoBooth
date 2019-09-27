const mongoose = require('mongoose');
const feedsSchema = mongoose.Schema(
  {
    imageLocation: {
      //Cloudinary image location
      type: Object,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    views: {
      type: String
    },
    emoji: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Emoji'
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feed'
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

module.exports = Feed = mongoose.model('Feed', feedsSchema);
