const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const cloudinary = require("cloudinary").v2;
const Tesseract = require("tesseract.js");

require("dotenv").config();

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

// Pagination code is highly inspired by youtube channel "Coding Garden with CJ" https://www.youtube.com/watch?v=_mwQR2lF6qc&t=4402s
const getAllFeeds = async (req, res, next) => {
  // Get query params
  let skip = Number(req.query.skip) || 0;
  let limit = Number(req.query.limit) || 10;
  console.log("Skip", skip, "Limit", limit);

  // Pass skip and limit to the find query
  try {
    let feeds = await Feed.find({})
      .skip(skip)
      .limit(limit)
      .sort("-createdAt");

    // send res back
    res.status(201).json(feeds);
  } catch (error) {
    res.status(501).json(error);
  }
};

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

    let { url, publicId } = await imgUploader(req.files.myImg);
    let containText = await detectText(url);
    if (containText) {
      // delete that uploded image
      const destroyRes = await cloudinary.uploader.destroy(publicId);
      // send res
      res.json({ errMsg: "Text filled image cannot be uploaded!" });
    }
    // Check Adult Content
    const isAdult = await detectAdultConent(url);
    if (isAdult) {
      // delete that uploded image
      const destroyRes = await cloudinary.uploader.destroy(publicId);
      // send res
      res.json({ errMsg: "No Adult Content!" });
    }

    req.body.image = url;

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

// Inspired from the blog post https://www.woolha.com/tutorials/node-js-google-cloud-vision-api-examples written by IVAN ANDRIANTO
const detectText = async image => {
  try {
    const results = await client.textDetection(image);
    const result = results[0].textAnnotations;
    if (result.length === 0) {
      return false;
    } else {
      const text = result[0].description;
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

const detectAdultConent = async image => {
  // Performs safe search detection on the local file
  const [result] = await client.safeSearchDetection(image);
  const detections = result.safeSearchAnnotation;
  if (detections.adult === "VERY_LIKELY" || detections.adult === "LIKELY") {
    return true;
  } else {
    return false;
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
};
