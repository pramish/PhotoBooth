import React from "react";

export const userService = {
  signup,
  login
};

function signup(name, password) {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON
  };
  return fetch("/users/register", reqOptions).then(res => res.json());
  // .then(json => {
  //     json.name;
  // });
}

function login(email, password) {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  };

  return fetch("http://localhost:5000/users/login", reqOptions).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    
  }).then(data =>         
    {localStorage.setItem("userToken", data.token);
    return data;
    }
  );
}
