import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../common/Navbar";
import SearchBar from "../common/SearchBar";
import EachFeed from "./EachFeed";
import SignIn from "./SignIn";

const Home = () => {
  const [state, setState] = useState(false);
  const change = () => {
    setState(!state);
  };
  return (
    <Container>
      <Navbar onClickHandler={change} />
      <SignIn boo={state} />
      <SearchBar />
      <div className="feedContainer">
        <EachFeed />
        <EachFeed />
        <EachFeed />
        <EachFeed />
      </div>
    </Container>
  );
};
export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  div.feedContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;
