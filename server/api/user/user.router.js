import express from "express";
import { getAllUsers } from "./user.controller";
// import userController from "./user.controller";

export const userRouter = express.Router();

userRouter
  .route("/")
  .get(getAllUsers)
  .post();

userRouter
  .route("/:username")
  .get()
  .put()
  .delete();
