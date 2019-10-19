import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import rootReducer from "./reducers";

// Empty initial state
const initialState = {};
// Add thunk as middleware
const middlewares = [Thunk];

// Store instance
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
