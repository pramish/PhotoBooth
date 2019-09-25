import React, { useState } from "react";
import styled from "styled-components";

import meme from "../../assets/meme.jpg";
import boy from "../../assets/default-round.png";

const EachFeed = () => {
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
        <img src={meme} />
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
      <img
        src={image}
        style={{
          height: "2rem",
          width: "2rem"
        }}
      />
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
  .blur {
    opacity: 0.2;
  }
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
`;

const Container = styled.div`
  cursor: pointer;
  display: grid;
  .img-wrapper,
  .overlay {
    grid-area: 1 / 1;
    display: flex;
  }
  .img-wrapper {
    height: 20rem;
    /* width: 20%; */

    img {
      ${props => (props.toggle ? "opacity: 0.5" : "")}
      height: auto;
      max-height: 100%;
      width: 100%;
      object-fit: cover;
      height: 20rem;
    }
  }
`;
