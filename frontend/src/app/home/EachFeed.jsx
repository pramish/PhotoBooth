import React from "react";
import styled from "styled-components";
import { FaComment } from "react-icons/fa";

import meme from "../../assets/meme.jpg";

const EachFeed = () => {
  return (
    <Container>
      <div className="img-wrapper">
        <img src={meme} />
      </div>
    </Container>
  );
};

export default EachFeed;

const Container = styled.div`
  .img-wrapper {
    height: 20rem;
    /* width: 20%; */
    background-color: red;
    img {
      height: auto;
      max-height: 100%;
      width: 100%;
      object-fit: cover;
      height: 20rem;
    }
  }
`;
