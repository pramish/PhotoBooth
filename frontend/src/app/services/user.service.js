import React from "react";
import axios from "axios";
import auth from "../helpers/auth/auth";

function signup(user) {
  return axios.post("http://localhost:5000/register", user);
}

function login(user) {
  return axios.post("http://localhost:5000/login", user).then(res => {
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
  return axios.post("http://localhost:5000/feeds/emoji/" + id, data);
}

export const userService = {
  signup,
  login,
  signOut
};
