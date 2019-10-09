import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../assets/default-round.png';
import { MdHome, MdSearch, MdFormatListBulleted } from 'react-icons/md';
import SearchBar from './SearchBar';

const Navbar = ({ onClickHandler }) => {
  const [searchClick, setSearchClick] = useState(false);
  const toggleSearchBar = () => {
    setSearchClick(!searchClick);
  };

  return (
    <Container>
      <h4>Photobooth</h4>

      <div>
        <img src={defaultImg} onClick={onClickHandler} />
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 1rem;
  div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* width: 10%; */
  }
  img {
    height: 2rem;
    width: 2rem;
  }
  h4 {
    margin: 0;
    font-size: 1.4rem;
    text-decoration: none;
    font-style: normal;
    color: white;
  }
  button {
    background-color: #177e89;
    color: #fff;
  }
  .navbtns {
    display: flex;
    justify-content: space-between;
    align-self: center;
    svg {
      margin-right: 1rem;
      margin-left: 1rem;
      cursor: pointer;
    }
  }
  .searchbar {
  }
`;
