import React from "react";
import styled from "styled-components";
import Navbar from "../common/Navbar";
import SearchBar from "../common/SearchBar";
import EachFeed from "./EachFeed";
import Categories from "./components/Categories";

const Home = () => {
  return (
    <>
      <TopNav>
        <Navbar />
        <Categories />
      </TopNav>
      <Container>
        <div className="each-feeds">
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
          <EachFeed />
          <EachFeed />
          <EachFeed />
        </div>
      </Container>
    </>
  );
};
export default Home;

const Container = styled.div`
  margin-top: 14rem;
  display: flex;
  flex-direction: column;
  padding-left: 6rem;
  padding-right: 6rem;

  .each-feeds {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    grid-gap: 1rem;
  }
`;

const TopNav = styled.div`
  position: fixed;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
  padding-right: 1rem;
`;
