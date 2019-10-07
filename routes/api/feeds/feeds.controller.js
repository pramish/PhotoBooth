const cloudinary = require("cloudinary").v2;
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
    let img = req.files.myImg;
    let response = await cloudinary.uploader.upload(img.tempFilePath);
    req.body.image = response.url;
    next();
  } catch (error) {
    next(error);
  }
};

const postComments = async (req, res, next) => {
  try {
    const userID = req.params.imageId;
    //Get the current feed
    const feed = await Feed.findById({
      _id: userID
      // _id: req.body.imageId
      // _id: '5d9416f92df1f520832f0b18'
    });
    // const feed = true
    if (!feed) {
      res.status(404).json({
        error: "No such feed found"
      });
    } else {
      console.log("Current feed is ", feed);
      // const abc = 2 * 2;
      const img = req.files.myImg; //Getting the image from the front end
      let response = await cloudinary.uploader.upload(img.tempFilePath); //Uploading the image to the cloudinary
      // console.log('Comments is Hello ');
      // await feed.comments.push('response.url');
      // PersonModel.update(
      //   { _id: person._id },
      //   { $push: { friends: friend } },
      //   done
      // );
      feed.update(
        {
          _id: userID
        },
        {
          // $push: { comments: Feed }
          $push: { comments: response.url }
        },
        done
      );
      //   { _id: person._id },
      // { $push: { friends: friend } },
      // done
      // await feed.save(done);
      console.log("Comments has been successfully posted");
      // {$push: {friends: {firstName: "Harry", lastName: "Potter"}}}
      return res.status(200).json({
        Feedhahaha: feed
      });
    }
  } catch (error) {
    res.status(500).json({
      errorIs: error
    });
  }
};

module.exports = {
  getAllFeeds,
  getOneFeed,
  createFeed,
  deleteOneFeed,
  uploadImage,
  postComments,
  isRightUser
  // detectImage
};
