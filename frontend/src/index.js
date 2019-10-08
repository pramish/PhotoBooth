import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import auth from "./app/helpers/auth/auth";

const token = localStorage.getItem("userToken");
if (token) {
  auth(token);
}

ReactDOM.render(<App />, document.getElementById("root"));
