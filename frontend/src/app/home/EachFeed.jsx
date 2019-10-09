import React, { useState } from "react";
import styled from "styled-components";

import meme from "../../assets/meme.jpg";
import boy from "../../assets/default-round.png";
import laugh from "../../assets/emojis/laugh.png";
import like from "../../assets/emojis/like.png";
import sad from "../../assets/emojis/sad.png";
import smile from "../../assets/emojis/smile.png";
import love from "../../assets/emojis/love.png";

const EachFeed = () => {
  const [toggleDetails, setToggleDetails] = useState(false);
  const [reaction, setReaction] = useState(false);

  const showDetails = () => {
    setToggleDetails(true);
  };

  const hideDetails = () => {
    setToggleDetails(false);
  };

  const toggleReaction = () => {
    setReaction(!reaction);
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
        <DetailsView
          image={boy}
          reaction={reaction}
          toggleReaction={toggleReaction}
        />
      </div>
    </Container>
  );
};

const DetailsView = ({ image, reaction, toggleReaction }) => (
  <DetailsViewContainer>
    <h3>Let's go Stake!! </h3>
    <div className="author">
      <img src={image} />
      <p>IoanMack</p>
    </div>
    {reaction ? (
      <div style={{ backgroundColor: "#ffffff" }}>
        <div className="emoji">
          <img src={laugh} />
        </div>
        <img src={smile} />
        <img src={sad} />
        <img src={like} />
        <img src={love} />
      </div>
    ) : (
      <div></div>
    )}
    <button onClick={toggleReaction}> React </button>
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
  :hover .img {
    background: black;
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
