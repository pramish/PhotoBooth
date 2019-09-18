import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Splash from "./app/splash/Splash";
import Home from "./app/home/Home";

const PhotoBoothRouter = () => (
  <Router>
    <Route exact path="/" component={Splash} />
    <Route path="/home" component={Home} />
  </Router>
);

export default PhotoBoothRouter;
