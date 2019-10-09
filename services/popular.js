const router = require('express').Router();

const Feed = require('../routes/api/feeds/feeds.model');

const popularFeed = async (req, res, next) => {
  try {
    // const views = 100000;
    //based on the number of views we have to define the popular feeds
    const feeds = await Feed.find().sort({ views: -1 }); //Sorting the feeds based on the number of views
    res.status(201).json(feeds);
  } catch (error) {
    res.status(500).json(error);
  }
};

router.post('/', popularFeed);

module.exports = router;
