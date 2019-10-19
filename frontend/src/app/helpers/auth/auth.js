import React from "react";
import axios from "axios";

// This function adds authentication header to each and every axios request
export default function auth(token) {
  if (token) {
    // If there is token it sets it to the header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Else delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
}
