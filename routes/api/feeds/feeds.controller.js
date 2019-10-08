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
let placeholder =
  "https://dailybodyrestore.com/wp-content/uploads/2015/12/placeholder-image-800x800.gif";

const getAllFeeds = getAll(Feed);

const getOneFeed = getOne(Feed);

const createFeed = createOne(Feed);

const updateOneFeed = async (req, res, next) => {
  let id = req.params.id;
  console.log("Ako ho hya?", req.changeCriteria);
  console.log(req.placeholder);

  if (req.changeCriteria) {
    // Can update
    let doc = await Feed.updateOne(id, req.body);
    res.json(doc);
    // next();
  } else if (req.placeholder) {
    // Update only the image to plcaeholder
    const feed = await Feed.findById(id);
    feed.image = placeholder;
    const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
      new: true
    });

    res.json(updatedFeed);
  }
};

const deleteOneFeed = async (req, res, next) => {
  // let delCriteria = req.delCriteria;
  if (req.delCriteria) {
    let res = await Feed.findByIdAndDelete(req.params.id);
    res.json({ message: "Successfully Deleted", response: res });
  } else {
    res.json({ message: "This feed cannot be deleted!" });
  }
};

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
    // let imageUrl = imgUploader(req.files.myImg);
    req.body.image = "imageUrl";

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

const checkDeletionCriteria = async (req, res, next) => {
  let id = req.params.id;
  req.placeholder = false;

  try {
    let feed = await Feed.findById(id);

    // feed can be deleted and changed if no reaction or response
    if (feed.comments.length === 0 && feed.emoji.length === 0) {
      req.delCriteria = true;
      req.changeCriteria = true;
      next();
    } else if (feed.emoji.length > 0 && feed.comments.length === 0) {
      // feed cannot be deleted but changed if there is reaction
      req.delCriteria = false;
      req.changeCriteria = true;
      next();
    } else if (feed.comments.length > 0 && feed.emoji.length > 0) {
      // feed having both reaction and response cannot be changed or deleted, instead replaced by placeholder

      req.delCriteria = false;
      req.changeCriteria = false;
      req.placeholder = true;
      next();
    }
  } catch (err) {
    res.status(501).json({ message: "Error" });
  }
};

module.exports = {
  getAllFeeds,
  getOneFeed,
  createFeed,
  deleteOneFeed,
  uploadImage,
  isRightUser,
  checkDeletionCriteria,
  updateOneFeed
  // detectImage
};
