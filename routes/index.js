const router = require("express").Router();
const userRouter = require("./api/users/users.router");
const feedRouter = require("./api/feeds/feeds.router");
// const emojiRouter = require("./api/emoji/emoji.router");

const errorHandler = require("../services/errorHandler");

router.use("/users", userRouter);
router.use("/feeds", feedRouter);
// router.use("/emoji", emojiRouter);

router.use(errorHandler);

module.exports = router;
