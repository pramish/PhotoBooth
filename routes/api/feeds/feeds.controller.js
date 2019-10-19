const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const cloudinary = require("cloudinary").v2;

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

require("dotenv").config();

/**
 * @description Get all feed from the database
 *  Pagination code is highly inspired by youtube channel
 * "Coding Garden with CJ" https://www.youtube.com/watch?v=_mwQR2lF6qc&t=4402s
 */
//
const getAllFeeds = async (req, res, next) => {
  // Get query params
  let skip = Number(req.query.skip) || 0;
  let limit = Number(req.query.limit) || 50;
  // console.log("Skip", skip, "Limit", limit);
  // Pass skip and limit to the find query
  try {
    let feeds = await Feed.find({})
      .skip(skip)
      .limit(limit)
      .sort("createdAt");

    // send res back
    res.status(201).json(feeds);
  } catch (error) {
    res.status(501).json(error);
  }
};

/**
 * @description This function is responsible for counting the views for feeds
 */
const countViews = async (req, res) => {
  try {
    let imageToCount = req.params.imageId; //getting the image id to count the views
    console.log(imageToCount);

    const feed = await Feed.findById(imageToCount); //find the image based on the imageID
    const views = feed.views;
    // const feed = await Feed.findById(id);
    // feed.image = placeholder;
    // const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed

    //increasing the counter by one
    const updateViewFeed = await Feed.findByIdAndUpdate(imageToCount, {
      views: views + 1
    });
    //updating the feed
    res.json({
      updatedFeed: feed
    });
  } catch (error) {}
};

/**
 * @description Renders view called booking with details about loggeed in user and service providers
 * @param {Object} req The request object from the client
 * @param {Object} res The response object that is to be sent to client
 */
const getOneFeed = async (req, res, next) => {
  console.log("ID:", req.params.id);

  //getting the feed based on the id
  let feed = await Feed.findById(req.params.id)
    .populate("comments")
    .exec();
  res.json(feed);
};

const createFeed = createOne(Feed); //creating the feeds

/**
 * @description Responsible for updating the Feed based on different criteria
 * @param {Object} req The request object from the client
 * @param {Object} res The response object that is to be sent to client
 */
const updateOneFeed = async (req, res, next) => {
  //updating the feeds based on the id
  let id = req.params.id;
  console.log("Ako ho hya?", req.changeCriteria);
  console.log(req.placeholder);

  if (req.changeCriteria) {
    // Update feed based on the id and body of the request
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

    //sending the updated feed on json object
    res.json(updatedFeed);
  }
};
/**
 * @description Responsible for deleting the feed
 * @param {Object} req The request object from the client
 * @param {Object} res The response object that is to be sent to client
 */
const deleteOneFeed = async (req, res, next) => {
  //deleting the feed based on delete criteria
  // let delCriteria = req.delCriteria;
  if (req.delCriteria) {
    //if criteria is fullfilled then it is deleted
    let res = await Feed.findByIdAndDelete(req.params.id);
    res.json({
      message: "Successfully Deleted",
      response: res
    });
  } else {
    res.json({
      message: "This feed cannot be deleted!"
    });
  }
};

/**
 * @description Checks if the user is the right user i.e. the one who created the feed
 * @param {Object} req The request object from the client
 * @param {Object} res The response object that is to be sent to client
 */
const isRightUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ user: req.user.id });
    const feed = await Feed.findById(req.params.id);
    // Check for post owner because we dont want anyone to delete post
    if (feed.user.toString() !== req.user.id) {
      //if not right user then it is not allowed to do anything except viewing the feeds
      return res.status(401).json({ notauthorized: "Use not authorized!" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/**
 * @description Responsbile for uploading the image in cloudainary
 * by checking different detections
 */
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
    //get the title of the feeds
    req.body.title = req.body.title;
    // Send the respose to next middleware
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @description Checks for different deletion criteria
 */
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

/**
 * @description Helps to detect text inside the image
 * Inspired from the blog post https://www.woolha.com/tutorials/node-js-google-cloud-vision-api-examples
 * written by IVAN ANDRIANTO
 * @param {string} image Actual image url
 */
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

/**
 * @description Helps to detect adult content inside the image
 * Inspired from the blog post https://www.woolha.com/tutorials/node-js-google-cloud-vision-api-examples
 * written by IVAN ANDRIANTO
 * @param {string} image Actual image url
 */
const detectAdultConent = async image => {
  const [result] = await client.safeSearchDetection(image);
  const detections = result.safeSearchAnnotation;
  // if detections contains following adult values
  if (
    (detections !== null && detections.adult === "VERY_LIKELY") ||
    detections.adult === "LIKELY"
  ) {
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
  updateOneFeed,
  countViews
};
