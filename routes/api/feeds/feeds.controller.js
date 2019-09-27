const Feed = require("./feeds.model");
const {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll
} = require("../../helpers/dbOperations");
const cloudinary = require("cloudinary").v2;

const getAllFeeds = getAll(Feed);
const getOneFeed = getOne(Feed);
const createFeed = createOne(Feed);
const deleteFeed = deleteOne(Feed);

const uploadImage = async (req, res, next) => {
  try {
    // let image = await cloudinary.uploader.upload(req.file.path);
    // req.body.image = image;
    next();
  } catch (error) {
    next(error);
  }
};


// router.delete("/deleteimage", async (req, res) => {
//   const feed = await Feed.findByIdAndDelete(req.params.id);
//   if (!feed) {
//     return res.json({
//       message: "Images could not be deleted"
//     });
//   }
//   res.json({
//     message: "Images has been deleted"
//   });
// });

module.exports = {
  getAllFeeds,
  getOneFeed,
  createFeed,
  deleteFeed,
  uploadImage
};
