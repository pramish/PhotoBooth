import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Table, Header, Rating } from "semantic-ui-react";
import Navbar from "../common/Navbar";
import Axios from "axios";

const Admin = props => {
  const { user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const userId = user._id;
  useEffect(() => {
    Axios.get(`http://localhost:5000/feeds/findByUserId/${userId}`).then(
      res => {
        console.log(res.data);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      <Navbar history={props.history} />
      {loading ? <Loader active inline="centered" /> : "Hey"}
    </div>
  );
};

export default Admin;
