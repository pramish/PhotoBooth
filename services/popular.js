const router = require("express").Router();

const Feed = require("../routes/api/feeds/feeds.model"); //getting the feeds model

/**
 * @description This function returns all feeds based on views
 * @param {Object} req  The request from the client
 * @param {*} res The response objec that is to be sent to the client
 */
const popularFeed = async (req, res) => {
  try {
    // const views = 100000;
    //based on the number of views we have to define the popular feeds
    const feeds = await Feed.find().sort({ views: -1 }); //Sorting the feeds based on the number of views
    res.status(201).json(feeds);
  } catch (error) {
    res.status(500).json(error);
  }
};

router.post("/", popularFeed);

module.exports = router;
