import React, { useState } from "react";
import styled from "styled-components";
import {
  MdHome,
  MdSearch,
  MdFormatListBulleted,
  MdChevronRight,
  MdTrendingUp,
  MdAdd
} from "react-icons/md";
import { DiCodeigniter } from "react-icons/di";

import { Fab, Fade, Modal, Backdrop, makeStyles } from "@material-ui/core";

import defaultImg from "../../assets/default-girl.png";

import AddImageForm from "./components/AddImageForm";
import EachFeed from "./EachFeed";
import Categories from "./components/Categories";
import SignIn from "./SignIn";
import { Container } from "./styles";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);

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

  return (
    <Container>
      <div className="title">
        <h4>Photobooth</h4>
      </div>
      <div className="navbtns">
        <div>
          <MdHome color="white" size="2rem" />

          <MdSearch color="white" size="2rem" onClick={handleClose} />

          <MdFormatListBulleted color="white" size="2rem" />
        </div>
      </div>
      <div className="profile">
        <div>
          <img src={defaultImg} onClick={toggleSignIn} />
          <SignIn profileClicked={profileClicked} />
        </div>
      </div>
      <div className="side-categories">
        <div className="top-trendings">
          <div className="trendings">
            <MdTrendingUp /> Trending <MdChevronRight />
          </div>
          <div className="top-artist">
            <DiCodeigniter />
            Top Artists <MdChevronRight />
          </div>
        </div>
        <div className="categories">
          <Categories />
        </div>
        <div>Photobooth @2019 </div>
      </div>
      <div className="main-feeds">
        <CustomModel open={open} handleClose={handleClose} />
        <EachFeed />
        <EachFeed />
        <EachFeed />
        <EachFeed />
        <EachFeed />
        <EachFeed />
        <EachFeed />
        <EachFeed />
        <EachFeed />
        <EachFeed />
      </div>
      <div className="side-artist">
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
          <div className="fab">
            <Fab color="primary" aria-label="add" onClick={handleAddClick}>
              <MdAdd size="1.5rem" />
            </Fab>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Home;
