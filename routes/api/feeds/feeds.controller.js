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
    //Get the current feed
    const feed = await Feed.findById({ _id: req.params.imageId });
    if (!feed) {
      res.status(404).json({
        error: 'No such feed found'
      });
    } else {
      console.log('Current feed is ', feed);
      const img = req.files.myImg; //Getting the image from the front end
      let response = await cloudinary.uploader.upload(img.tempFilePath); //Uploading the image to the cloudinary
      console.log('Comments is ', response);
      await feed.comments.push(response.url);
      await feed.save(done);
      return res.status(200).json(feed);
      console.log('Comments has been successfully posted');
    }
  } catch (error) {
    res.status(500).json({
      error
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
