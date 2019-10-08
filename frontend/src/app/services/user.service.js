import React from "react";
import axios from "axios";

export const userService = {
  signup,
  login,
  signOut
};

function signup(user) {
  return axios.post("http://localhost:5000/users/register", user);
}

function login(user) {
  return axios.post("http://localhost:5000/users/login", user);
}

function signOut(token) {
  if (token === localStorage.setItem("userToken")) {
    localStorage.setItem("userToken", null);
  }
}
