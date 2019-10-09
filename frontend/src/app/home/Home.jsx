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

  useEffect(() => {
    axios
      .get("http://localhost:5000/feeds")
      .then(res => {
        console.log(res);
        setFeeds(res.data);
        setUploading(false);
      })
      .catch(err => {
        console.log(err);
      });
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(SetLoggedInUser(jwt.decode(token)));
    }
  }, []);

  const handleAddClick = () => {
    handleOpen();
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
