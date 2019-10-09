import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MdHome,
  MdSearch,
  MdFormatListBulleted,
  MdChevronRight,
  MdTrendingUp,
  MdAdd
} from 'react-icons/md';
import { DiCodeigniter } from 'react-icons/di';

import { Fab, Fade, Modal, Backdrop, makeStyles } from '@material-ui/core';

import defaultImg from '../../assets/default-girl.png';

import AddImageForm from "./components/AddImageForm";
import EachFeed from "./EachFeed";
import Categories from "./components/Categories";
import SignIn from "./SignIn";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import SetLoggedInUser from "../helpers/actions/login.action";
import axios from "axios";

const Home = props => {
  const [open, setOpen] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/feeds")
      .then(res => {
        console.log(res);
        setFeeds(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const toggleSignIn = () => {
    setProfileClicked(!profileClicked);
  };

  const handleAddClick = () => {
    handleOpen();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const token = localStorage.getItem("userToken");
  if (token) {
    dispatch(SetLoggedInUser(jwt.decode(token)));
  }

  return (
    <Container>
      <div className='title'>
        <h4>Photobooth</h4>
      </div>
      <div className='navbtns'>
        <div>
          <MdHome color='white' size='2rem' />

          <MdSearch color='white' size='2rem' onClick={handleClose} />

          <MdFormatListBulleted color='white' size='2rem' />
        </div>
      </div>
      <div className='profile'>
        <div>
          <img src={defaultImg} onClick={toggleSignIn} />
          <SignIn profileClicked={profileClicked} history={props.history} />
        </div>
      </div>
      <div className='side-categories'>
        <div className='top-trendings'>
          <div className='trendings'>
            <MdTrendingUp /> Trending <MdChevronRight />
          </div>
          <div className='top-artist'>
            <DiCodeigniter />
            Top Artists <MdChevronRight />
          </div>
        </div>
        <div className='categories'>
          <Categories />
        </div>
        <div>Photobooth @2019 </div>
      </div>
      <div className='main-feeds'>
        <CustomModel open={open} handleClose={handleClose} />
        {feeds.map(feed => (
          <EachFeed feedImg={feed.image} />
        ))}
      </div>
      <div className='side-artist'>
        <div>
          <img src={defaultImg} />
        </div>
        <div>
          <img src={defaultImg} />
        </div>
        <div>
          <img src={defaultImg} />
        </div>
        <div>
          <img src={defaultImg} />
        </div>
        <div>
          <div className='fab'>
            <Fab color='primary' aria-label='add' onClick={handleAddClick}>
              <MdAdd size='1.5rem' />
            </Fab>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Home;
