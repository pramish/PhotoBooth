import React from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { SearchContainer } from "./common.style";

/**
 * The component renders the searchbar.
 */
const SearchBar = () => (
  <SearchContainer>
    <MdSearch
      size="1.2rem"
      style={{ position: "absolute", color: "black", top: "27px" }}
    />
    <input placeholder="Search" />
  </SearchContainer>
);

export default SearchBar;
