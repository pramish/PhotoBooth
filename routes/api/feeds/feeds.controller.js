const Feed = require('./feeds.model');
const {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll
} = require('../../helpers/dbOperations');
const cloudinary = require('cloudinary').v2;
const vision = require('@google-cloud/vision');
const getAllFeeds = getAll(Feed);
const getOneFeed = getOne(Feed);
const createFeed = createOne(Feed);
const deleteFeed = deleteOne(Feed);

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

// const detectImage = async (req, res, next) => {
//   // Creates a client
//   try {
//     const client = new vision.ImageAnnotatorClient();
//     // // Performs label detection on the image file
//     const [result] = await client.labelDetection('./images/hello.jpeg');
//     const labels = result.labelAnnotations;
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//     // next();
//   } catch (error) {
//     console.log('The error is :', error);
//   }

//   //Have to detect the image before saving and after uploading
// };

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
        error: 'No such feed found'
      });
    } else {
      console.log('Current feed is ', feed);
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
      console.log('Comments has been successfully posted');
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
  deleteFeed,
  uploadImage,
  postComments
  // detectImage
};
