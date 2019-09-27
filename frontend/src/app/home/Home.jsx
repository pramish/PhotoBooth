import React from "react";
import styled from "styled-components";
import {
  MdHome,
  MdSearch,
  MdFormatListBulleted,
  MdChevronRight,
  MdTrendingUp,
  MdAdd
} from "react-icons/md";
import {
  Fab,
  Fade,
  Modal,
  Backdrop,
  Card,
  CardActions,
  CardContent,
  Button,
  makeStyles
} from "@material-ui/core";
import AddImageForm from "./components/AddImageForm";
import { DiCodeigniter } from "react-icons/di";
import ReactSVG from "react-svg";

import defaultImg from "../../assets/default-girl.png";
import trending from "../../assets/trending.svg";

import Navbar from "../common/Navbar";
import EachFeed from "./EachFeed";
import Categories from "./components/Categories";

const Home = () => {
  const [open, setOpen] = React.useState(false);

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

          <MdSearch color="white" size="2rem" />

          <MdFormatListBulleted color="white" size="2rem" />
        </div>
      </div>
      <div className="profile">
        <div>
          <img src={defaultImg} />
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

const CustomModel = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <AddImageForm />
      </Fade>
    </Modal>
  );
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 35% 40% 10%;
  grid-auto-rows: minmax(10px, auto);
  grid-template-areas:
    "title navbtns navbtns profile"
    "side-categories main-feeds main-feeds side-artist";

  .side-categories {
    grid-area: side-categories;
    padding: 1rem;
    display: grid;
    grid-auto-columns: minmax(0, auto);
    grid-template-rows: 0.4fr auto 0fr;

    .top-trendings {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      /* align-items: center; */
      margin-bottom: 2rem;
      div {
        display: flex;
        justify-content: space-between;
        /* align-items: flex-start; */
      }
    }
  }
  .main-feeds {
    grid-area: main-feeds;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    grid-gap: 1rem;
    height: 90vh;
    margin-top: 1rem;
    padding-left: 1rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .side-artist {
    grid-area: side-artist;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      height: 2rem;
      width: 2rem;
      margin: 0.4em;
    }
  }
  .title {
    text-align: center;
    grid-area: title;
  }
  .navbtns {
    grid-area: navbtns;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      display: flex;
      width: 20rem;
      justify-content: space-around;
      align-items: center;
    }
  }

  .profile {
    grid-area: profile;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      height: 2rem;
      width: 2rem;
    }
  }
  h4 {
    margin: 0;
    font-size: 1.4rem;
    text-decoration: none;
    font-style: normal;
    color: white;
  }
`;
