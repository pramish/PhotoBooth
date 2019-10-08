import isEmpty from "lodash/isEmpty";
import { SET_LOGGEDIN_USER } from "../types/userTypes.js";

const initialState = {
  isAuthenticated: false,
  user: {}
};

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
