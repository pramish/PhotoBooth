import React from "react";
import { SET_LOGGEDIN_USER } from "../types/userTypes";

// Returns SET_LOGGEDIN_USER type with corressponding user
export default function SetLoggedInUser(user) {
  return {
    type: SET_LOGGEDIN_USER,
    payload: user
  };
}
