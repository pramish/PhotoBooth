import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Table, Header, Rating } from "semantic-ui-react";
import Navbar from "../common/Navbar";
import Axios from "axios";
import PropTypes from "prop-types";

/**
 *  Display the fetched feeds of logged in user
 */
const Admin = props => {
  // Current logged in user from  global state
  const { user } = useSelector(state => state.auth);
  // Loading flag for showing Spinner before fetching all data
  const [loading, setLoading] = useState(true);
  // Store reference to the current user id
  const userId = user._id;

  useEffect(() => {
    // Fetch the feeds bu userId thats is logged in user
    Axios.get(`http://localhost:5000/feeds/findByUserId/${userId}`).then(
      res => {
        setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      <Navbar history={props.history} />
      {loading ? <Loader active inline="centered" /> : ""}
    </div>
  );
};

Admin.propTypes = {};

export default Admin;
