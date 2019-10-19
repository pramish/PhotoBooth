const router = require("express").Router();
const userRouter = require("./api/users/users.router");
const feedRouter = require("./api/feeds/feeds.router");
const errorHandler = require("../services/errorHandler");
const searchService = require("../services/search");
const popularService = require("../services/popular");
const newService = require("../services/new");
const { createUser, authenticateUser } = require("../services/auth");

//users api
router.use("/users", userRouter);
//feeds api
router.use("/feeds", feedRouter);

//register usr
router.route("/register").post(createUser);
//authenticate user
router.route("/login").post(authenticateUser);

//search service
router.use("/search", searchService);
//popular service
router.use("/popular", popularService);
router.use("/new", newService);
//using the error handler middleware
router.use(errorHandler);

module.exports = router;
