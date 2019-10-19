import React from "react";
import axios from "axios";
import auth from "../helpers/auth/auth";

/**
 * @description Handles Signin up the suer
 * @param {object} user contains email, password and name
 */
function signup(user) {
  return axios.post("http://localhost:5000/register", user);
}

/**
 * @description Handles Logging in  the suer
 * @param {object} user contains email and password
 */
function login(user) {
  return axios.post("http://localhost:5000/login", user).then(res => {
    const token = res.data.token;
    // Save token to the localstorage
    localStorage.setItem("userToken", token);
    auth(token);
  });
}

/**
 * @description Handles sigin out in  the suer
 * @param {string} token logged in user's jwt token
 */
function signOut(token) {
  if (token === localStorage.setItem("userToken")) {
    localStorage.setItem("userToken", null);
  }
}

/**
 * @description Handles reacting to the post
 * @param {string} id logged in user id
 * @param {object} data contains type of emoji
 */
function addEmoji(id, data) {
  // Create new emoji
  return axios.post("http://localhost:5000/feeds/emoji/" + id, data);
}

export const userService = {
  signup,
  login,
  signOut,
  addEmoji
};
