import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loader } from "semantic-ui-react";
import axios from "axios";

import { HomeContainer } from "./home.styles";
import EachFeed from "./EachFeed";
import Navbar from "../common/Navbar";

/**
 * The Home component in the first component that User sees. It fetches all the post and renders it in Grid view.
 */
const Home = props => {
  // Loading flag for showing Spinner before fetching all data
  const [uploading, setUploading] = useState(true);
  // Stores all feeds that will be fetched
  const [feeds, setFeeds] = useState([]);
  // Limit and Skip are the number of feeds we are fecthing and its skip values respectively
  const skip = 0;
  const limit = 15;

  useEffect(() => {
    // Fetch the feeds using limit and skips
    axios
      .get(`http://localhost:5000/feeds?limit=${limit}&skip=${skip}`)
      .then(res => {
        // Set the feeds and make the uploading flag false
        setFeeds(res.data);
        setUploading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <HomeContainer>
      <Navbar history={props.history} />

      <div style={{ display: "none" }}>
        <button id="trending">Trending Posts</button>
        <button id="sort">Popular on Views</button>
      </div>

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

// Returns EachFeed components taking all the fetched feeds
const getFeeds = (feeds, props) =>
  feeds.map(feed => (
    <EachFeed history={props.history} key={feed._id} feed={feed} />
  ));

export default Home;
