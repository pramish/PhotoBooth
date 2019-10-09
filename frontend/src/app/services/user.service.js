import React from "react";
import axios from "axios";
import auth from "../helpers/auth/auth";

function signup(user) {
  return axios.post("/register", user);
}

function login(user) {
  return axios.post("/login", user).then(res => {
    const token = res.data.token;
    localStorage.setItem("userToken", token);
    auth(token);
  });
}

function signOut(token) {
  if (token === localStorage.setItem("userToken")) {
    localStorage.setItem("userToken", null);
  }
}

function addEmoji(id, data) {
  return axios.post("/feeds/emoji/" + id, data);
}

export const userService = {
  signup,
  login,
  signOut
};
