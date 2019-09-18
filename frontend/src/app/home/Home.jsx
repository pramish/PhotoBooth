import React from "react";
import styled from "styled-components";
import Navbar from "../common/Navbar";
import SearchBar from "../common/SearchBar";
import EachFeed from "./EachFeed";

const Home = () => {
  return (
    <Container>
      <Navbar />
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
