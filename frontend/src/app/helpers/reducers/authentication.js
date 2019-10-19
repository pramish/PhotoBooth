import isEmpty from "lodash/isEmpty";
import { SET_LOGGEDIN_USER } from "../types/userTypes.js";

// Initial State for auth reducer
const initialState = {
  isAuthenticated: false,
  user: {}
};
// Rerturns corresponding data(payload) based on the type
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGGEDIN_USER:
      return {
        isAuthenticated: !isEmpty(payload),
        user: payload
      };
    default:
      return state;
  }
};
