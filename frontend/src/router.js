import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Splash from "./app/splash/Splash";
import Home from "./app/home/Home";
import Feed from "./app/feed/Feed";

const PhotoBoothRouter = () => (
  <Router>
    <Route exact path="/" component={Splash} />
    <Route path="/home" component={Home} />
    <Route path="/feed/:id" component={Feed} />
  </Router>
);

export default PhotoBoothRouter;
