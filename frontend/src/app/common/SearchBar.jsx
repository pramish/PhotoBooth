import React from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => (
  <Container>
    <input placeholder="Search" />
  </Container>
);
export default SearchBar;

const Container = styled.div`
  input {
    color: black;
    margin-top: 0.4rem;
    margin-right: 1rem;
    margin-left: 1rem;
    border: none;
    border-bottom: 0px solid #41403e;
    border-radius: 0.4rem;
    height: 1.3rem;
    padding-left: 1rem;
  }
`;
