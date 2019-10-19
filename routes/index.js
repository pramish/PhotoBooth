const router = require('express').Router();
const userRouter = require('./api/users/users.router'); //getting the users router
const feedRouter = require('./api/feeds/feeds.router'); //getting the feeds router
// const emojiRouter = require("./api/emoji/emoji.router");
const errorHandler = require('../services/errorHandler'); //getting the error handler from services
const searchService = require('../services/search'); //getting the search from services
const popularService = require('../services/popular'); //getting the popular from services
const newService = require('../services/new'); //getting the new from services
const { createUser, authenticateUser } = require('../services/auth');

router.use('/users', userRouter); //users api
router.use('/feeds', feedRouter); //feeds api

router.route('/register').post(createUser); //register usr
router.route('/login').post(authenticateUser); //authenticate user

router.use('/search', searchService); //search service
router.use('/popular', popularService); //popular service
router.use('/new', newService); //newservice
// router.use("/emoji", emojiRouter);

router.use(errorHandler); //using the error handler

module.exports = router;
