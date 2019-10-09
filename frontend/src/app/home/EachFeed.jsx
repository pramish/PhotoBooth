import React, { useState } from "react";
import styled from "styled-components";

import meme from "../../assets/meme.jpg";
import boy from "../../assets/default-round.png";

const EachFeed = ({feedImg}) => {
  const [toggleDetails, setToggleDetails] = useState(false);

  const showDetails = () => {
    setToggleDetails(true);
  };

  const hideDetails = () => {
    setToggleDetails(false);
  };

  return (
    <Container
      onMouseEnter={showDetails}
      onMouseLeave={hideDetails}
      toggle={toggleDetails}
    >
      <div className="img-wrapper">
        <img src={feedImg} />
      </div>
      <div className="overlay">
        <DetailsView image={boy} />
      </div>
    </Container>
  );
};

const DetailsView = ({ image }) => (
  <DetailsViewContainer>
    <h3>Let's go Stake!! </h3>
    <div className="author">
      <img src={image} />
      <p>IoanMack</p>
    </div>
  </DetailsViewContainer>
);

export default EachFeed;

const DetailsViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-left: 1rem;
  margin-top: 0.4em;

  h3 {
    margin: 0;
  }
  .author {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    p {
      margin-left: 0.7rem;
    }
  }
  img {
    height: 2em;
    width: 2em;
  }
`;

const Container = styled.div`
  cursor: pointer;
  display: grid;
  .img-wrapper,
  .overlay {
    grid-area: 1 / 1;
    /* ${props => (props.toggle ? "" : "display: flex;  ")} */
  }
  .img-wrapper {
    height: 20rem;
    img {
      height: auto;
      max-height: 100%;
      width: 100%;
      object-fit: cover;
      height: 20rem;
      /* ${props =>
        props.toggle ? "object-fit: contain; margin-top: 1em;" : ""} */
    }
  }
`;
