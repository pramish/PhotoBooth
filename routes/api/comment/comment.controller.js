const Feed = require("../feeds/feeds.model");
// const Comment = require("../comment/comment.model");
const imgUploader = require("../../helpers/imgUploader");

/**
 * @description Responsbile for adding new comment and saving it to database
 * @param {Object} req The request object from the client
 * @param {Object} res The response object that is to be sent to client
 */
const addNewComment = async (req, res, next) => {
  try {
    // Get feed by id of params object
    const feed = await Feed.findById(req.params.id);
    if (!feed) {
      res.status(404).json({
        error: "No such feed found"
      });
    } else {
      // Upload image to the cloudinary
      const { url, publicId } = await imgUploader(req.files.myImg);
      const newCommentFeed = new Feed({
        user: req.user._id,
        image: url,
        default: false
      });
      // Save the new comment
      const commtRes = await newCommentFeed.save();

      // This process of unshifting comment is inspired from Brad Traversy
      // youtube playlist
      // link: https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE
      feed.comments.unshift(commtRes._id);
      const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
        new: true
      });

      res.status(201).json(updatedFeed);
    }
  } catch (err) {
    res.status(404).json(err);
  }
};

/**
 * @description Delete the comment that user commented
 * @param {Object} req The request object from the client
 * @param {Object} res The response object that is to be sent to client
 */
const deleteThatComment = async (req, res, next) => {
  const feed = await Feed.findById(req.params.id);
  // Check if comment exits or not
  if (
    feed.comments.filter(comment => comment.toString() === req.params.commentId)
      .length === 0
  ) {
    return res.status(404).json({ commentnotfound: "No comment found" });
  }
  // Get the removal index
  const removeIndex = feed.comments
    .map(commentId => commentId.toString())
    .indexOf(req.params.commentId);

  //Splice comment out of that comments array
  feed.comments.splice(removeIndex, 1);
  // This process of splicing comment is inspired from Brad Traversy
  // youtube playlist
  // link: https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE
  const updatedFeed = await Feed.findByIdAndUpdate(feed.id, feed, {
    new: true
  });
  res.status(201).json(updatedFeed);
};

module.exports = {
  addNewComment,
  deleteThatComment
};
