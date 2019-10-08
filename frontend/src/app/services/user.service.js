import React from "react";
import axios from "axios";

export const userService = {
  signup,
  login,
  signOut
};

function signup(user) {
  // const dataToSend = user.JSON.stringify();
  return axios.post("http://localhost:5000/users/register", user);

  // const reqOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     name: name,
  //     email: email,
  //     password: password,
  //     password2: confirmPassword
  //   })
  // };
  // return fetch("/users/register", reqOptions).then(res => {
  //   if (res.status == 200) return res;
  // });
}

function login(email, password) {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password
    })
  };

  return fetch("http://localhost:5000/users/login", reqOptions)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(data => {
      localStorage.setItem("userToken", data.token);
      return data;
    });
}

function signOut(token) {
  if (token === localStorage.setItem("userToken")) {
    localStorage.setItem("userToken", null);
  }
}
