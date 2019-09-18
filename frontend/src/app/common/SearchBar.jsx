import React from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => (
  <Container>
    <input placeholder="Search" />
    <IoIosSearch size={`1.8em`} style={{ cursor: "pointer" }} />
  </Container>
);
export default SearchBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 51%;
    border: none;
    border-bottom: 1px solid #41403e;
    border-bottom-left-radius: 0 0;
  }
`;
