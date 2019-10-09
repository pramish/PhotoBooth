import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";

import EachFeed from "./EachFeed";

import axios from "axios";
import { HomeContainer } from "./styles";
import { CustomModel } from "./components/CustomModel";
import Navbar from "../common/Navbar";
import SetLoggedInUser from "../helpers/actions/login.action";
import { Grid, Loader } from "semantic-ui-react";

const Home = props => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(true);

  const [feeds, setFeeds] = useState([]);
  const [popularlySortedFeeds, setSortedFeeds] = useState([]);

  const skip = 0;
  const limit = 10;

  useEffect(() => {
    axios
      .get(`/feeds?limit=${limit}&skip=${skip}`)
      .then(res => {
        console.log(res);
        setFeeds(res.data);
        setUploading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const sortByPopularity = () => {
    console.log(feeds);
    console.log(feeds[0].views);
    feeds.sort((a, b) => b.views - a.views);
    console.log(feeds);
    setFeeds(feeds);
    props.history.push("/home");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <HomeContainer>
      <Navbar history={props.history} />
      <div className="main-feeds">
        {uploading ? (
          <Loader active inline="centered" />
        ) : (
          getFeeds(feeds, props)
        )}
      </div>
    </HomeContainer>
  );
};

const getFeeds = (feeds, props) =>
  feeds.map(feed => (
    <EachFeed history={props.history} key={feed._id} feed={feed} />
  ));

export default Home;
