import express from "express";
import { userRouter } from "./user/user.router";
import { postRouter } from "./post/post.router";

export const restRouter = express.Router();

restRouter.use("/users", userRouter);
restRouter.use("/posts", postRouter);
