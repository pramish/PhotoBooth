const router = require('express').Router();

const Feed = require('../routes/api/feeds/feeds.model');

const newFeed = async (req, res, next) => {
  try {
    const feeds = await Feed.find().sort({ createdAt: -1 }); //Sorting the feeds based on the created date of feeds
    res.status(201).json(feeds);
  } catch (error) {
    res.status(500).json(error);
  }
};

router.post('/', newFeed);

module.exports = router;
