import React from "react";
import axios from "axios";
import auth from "../helpers/auth/auth";

export const userService = {
  signup,
  login,
  signOut
};

function signup(user) {
  return axios.post("http://localhost:5000/users/register", user);
}

function login(user){
  return axios.post("http://localhost:5000/users/login", user).then(res => {
    const token = res.data.token;
    localStorage.setItem("userToken", token);
    auth(token);
  });
};

function signOut(token) {
  if (token === localStorage.setItem("userToken")) {
    localStorage.setItem("userToken", null);
  }
}
