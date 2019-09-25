const mongoose = require('mongoose');
const feedsSchema = new mongoose.Schema({
  feedLocation: {
    //AWS or Cloudinary image location
    type: String,
    required: true
  },
  feedReactType: {
    // 5 Reactions.
    type: String,
    required: true
  },
  feedComments: {
    //Comments and Reaction must be in an array because this can be many to one relationship.
    type: String,
    required: true
  },
  post_date: {
    type: Date,
    default: Date.now
  }
});

const Feeds = mongoose.model('Feeds', feedsSchema);
module.exports = Feeds;
