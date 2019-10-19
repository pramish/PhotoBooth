const router = require("express").Router();
const Feed = require("../routes/api/feeds/feeds.model"); //getting the feeds model

/**
 * @description This function handles searching functionality for client
 * @param {Object} req  The request from the client
 * @param {*} res The response objec that is to be sent to the client
 */
const searchFeed = async (req, res) => {
  //search feed api
  try {
    const query = req.query.search;
    console.log(query);

    const skip = req.query.skip || 0;
    const limit = req.query.limit || 3;
    // Search the DB based on the query
    const searchedFeed = await Feed.find({
      title: { $regex: query, $options: "i" } //Works only for title or category only now
    })
      .skip(skip)
      .limit(limit);
    if (searchedFeed) {
      console.log("Yaha aayo ra", searchedFeed);
      res.status(201).json(searchedFeed);
    } else {
      res.status(404).json({ message: "No such feeds found" });
    }
  } catch (error) {
    console.log("Error ayyo hai");
    res.status(501).json(error);
  }
};

router.post("/", searchFeed);

module.exports = router;
