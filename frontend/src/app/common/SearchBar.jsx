import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

const SearchBar = () => (
  <Container>
    <MdSearch
      size='1.2rem'
      style={{ position: 'absolute', color: 'black', top: '27px' }}
    />
    <input placeholder='Search' />
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
  svg {
    fill: black;
  }
`;
