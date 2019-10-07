import React from "react";

export const userService = {
  signup,
  login
};

function signup(name,email, password,confirmPassword) {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password,
      "password2": confirmPassword
    })
  };
  return fetch("/users/register", reqOptions).then(res =>{if(res.status == 200) return res;});
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
