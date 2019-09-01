import express from "express";

export const postRouter = express.Router();

postRouter
  .route("/")
  .get()
  .post();

postRouter
  .route("/:id")
  .get()
  .put()
  .delete();
