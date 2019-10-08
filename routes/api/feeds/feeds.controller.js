const vision = require("@google-cloud/vision");

const {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll
} = require("../../helpers/dbOperations");
const Feed = require("./feeds.model");
const User = require("../users/users.model");
const imgUploader = require("../../helpers/imgUploader");

const getAllFeeds = getAll(Feed);

const getOneFeed = getOne(Feed);

const createFeed = createOne(Feed);

const deleteOneFeed = deleteOne(Feed);

const isRightUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ user: req.user.id });
    const feed = await Feed.findById(req.params.id);

    // Check for post owner because we dont want anyone to delete post
    if (feed.user.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: "Use not authorized!" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const uploadImage = async (req, res, next) => {
  try {
    // Attach image key to the body object with the uploaded image
    let imageUrl = imgUploader(req.files.myImg);
    req.body.image = imageUrl;

    // Attach user id of the logged in user body object
    req.body.user = req.user._id;
    // Set initial views to 0
    req.body.views = 0;
    // Send the respose to next middleware
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFeeds,
  getOneFeed,
  createFeed,
  deleteOneFeed,
  uploadImage,
  isRightUser
  // detectImage
};
