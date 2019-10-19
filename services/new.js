const router = require("express").Router();

const Feed = require("../routes/api/feeds/feeds.model"); //getting the feeds model

/**
 * @description This function returns all feeds sorting them with createdAT date
 * @param {Object} req  The request from the client
 * @param {*} res The response objec that is to be sent to the client
 */
const newFeed = async (req, res) => {
  try {
    // Gets all the feeds from DB and stors it
    const feeds = await Feed.find().sort({ createdAt: -1 });
    res.status(201).json(feeds);
  } catch (error) {
    res.status(500).json(error);
  }
};

router.post("/", newFeed);

module.exports = router;
