import React from "react";
import Axios from "axios";

/**
 * @description Handles creating new Feed in the server
 * @param {file} image
 * @param {string} title
 */
export const postFeed = async (image, title) => {
  // Instance of FormData() to get reference to the form and append data to it
  let formData = new FormData();
  formData.append("myImg", image);
  formData.append("title", title);
  // Post image and title to /feeds api
  let res = await Axios.post("http://localhost:5000/feeds", formData);
  return res.data;
};

/**
 * @description Handles creating new Comment in the server
 * @param {file} image
 * @param {string} title
 */
export const postComment = async image => {
  // Instance of FormData() to get reference to the form and append data to it
  let formData = new FormData();
  formData.append("myImg", image);

  let res = await Axios.post(
    `http://localhost:5000/feeds/comment/${id}`,
    formData
  );
  return res.data;
};
