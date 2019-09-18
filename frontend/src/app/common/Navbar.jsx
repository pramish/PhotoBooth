import React from "react";
import styled from "styled-components";
import defaultImg from "../../assets/default-round.png";
import SearchBar from "./SearchBar";

const Navbar = ({ onClickHandler }) => {
  return (
    <Container>
      <h4>Photobooth</h4>
      <div>
        <button>Create</button>
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
    width: 15%;
  }
  img {
    /* border: none !important; */
    height: 2.5rem;
    width: 2.5rem;
  }
  h4 {
    margin: 0;
  }
  button {
    background-color: #177e89;
    color: #fff;
  }
`;
