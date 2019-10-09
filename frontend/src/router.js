import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import Splash from "./app/splash/Splash";
import Home from "./app/home/Home";
import Feed from "./app/feed/Feed";
import SetLoggedInUser from "./app/helpers/actions/login.action";
import PrivateRoute from "./app/common/PrivateRoute";
import Admin from "./app/admin/Admin";

const PhotoBoothRouter = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  if (token) {
    dispatch(SetLoggedInUser(jwt.decode(token)));
  }
  return (
    <Router>
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
