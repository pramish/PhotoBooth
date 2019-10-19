import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import jwt from "jsonwebtoken";

import Splash from "./app/components/splash/Splash";
import Home from "./app/components/home/Home";
import Feed from "./app/components/feed/Feed";
import SetLoggedInUser from "./app/helpers/actions/login.action";
import PrivateRoute from "./app/components/common/PrivateRoute";
import Admin from "./app/components/admin/Admin";

// instancate the history to track appliation route history
const history = createBrowserHistory();

// This component simply returns the whole application routes
const PhotoBoothRouter = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");

  // If there is token in the local storage the set it to the Authorization header
  if (token) {
    dispatch(SetLoggedInUser(jwt.decode(token)));
  }

  return (
    <Router history={history}>
      <Route exact path="/" component={Splash} />
      <Route path="/home" component={Home} />
      <Route path="/feed/:id" component={Feed} />
      <Switch>
        <PrivateRoute exact path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
};

export default PhotoBoothRouter;
