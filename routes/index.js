const router = require('express').Router();
const userRouter = require('./api/users/users.router');
const feedRouter = require('./api/feeds/feeds.router');
// const emojiRouter = require("./api/emoji/emoji.router");
const errorHandler = require('../services/errorHandler');
const searchService = require('../services/search');
const popularService = require('../services/popular');
const trendingService = require('../services/trending');
const newService = require('../services/new');
const { createUser, authenticateUser } = require('../services/auth');

router.use('/users', userRouter);
router.use('/feeds', feedRouter);

router.route('/register').post(createUser);
router.route('/login').post(authenticateUser);

router.use('/search', searchService);
router.use('/trending', trendingService);
router.use('/popular', popularService);
router.use('/new', newService);
// router.use("/emoji", emojiRouter);

router.use(errorHandler);

module.exports = router;
