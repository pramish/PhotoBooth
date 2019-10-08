import { combineReducers } from "redux";

import authentication from "../app/helpers/reducers/authentication"

export default combineReducers({
    auth : authentication
});
