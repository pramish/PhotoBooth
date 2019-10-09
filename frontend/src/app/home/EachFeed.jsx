import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import meme from "../../assets/meme.jpg";
import boy from "../../assets/default-round.png";
import laugh from "../../assets/emojis/laugh.png";
import like from "../../assets/emojis/like.png";
import sad from "../../assets/emojis/sad.png";
import smile from "../../assets/emojis/smile.png";
import love from "../../assets/emojis/love.png";
import { Header } from "semantic-ui-react";

const EachFeed = ({ feed, history }) => {
  const [toggleDetails, setToggleDetails] = useState(false);
  const [reaction, setReaction] = useState(false);
  const [recGiven, setRecGiven] = useState(false);
  const [givenEmo, setGivenEmo] = useState("");

  const showDetails = () => {
    setToggleDetails(true);
  };

  const hideDetails = () => {
    setToggleDetails(false);
  };

  const toggleReaction = () => {
    setReaction(!reaction);
  };

  const giveRec = emoji => {
    setRecGiven(!recGiven);
    setGivenEmo(emoji);
    setReaction(!reaction);
  };

  return (
    <Container
      className="ui card eachfeed"
      onClick={() => history.push(`/feed/${feed._id}`)}
    >
      <div className="content">
        <div className="right floated meta">14h</div>
        <img className="ui avatar image" src={boy} />
        Elliot
      </div>
      <div className="image">
        <img src={feed.image} />
      </div>
      <div className="extra content">
        <div className="ui large transparent left icon input">
          <span>{feed.title}</span>
        </div>
      </div>
      <div className="content">
        <span className="right floated">
          <i className="heart outline like icon"></i>
          17 likes
        </span>
        <i className="comment icon"></i>3 comments
      </div>
    </Container>
  );
};

// const DetailsView = ({
//   image,
//   reaction,
//   toggleReaction,
//   givenEmo,
//   giveRec,
//   recGiven
// }) => (
//   <DetailsViewContainer>
//     <h3>Let's go Stake!! </h3>
//     <div classNameName="author">
//       <img src={image} />
//       <p>IoanMack</p>
//     </div>
//     {reaction ? (
//       <div style={{ backgroundColor: "#ffffff" }}>
//         <img src={laugh} onClick={() => giveRec(laugh)} />
//         <img src={smile} onClick={() => giveRec(smile)} />
//         <img src={sad} onClick={() => giveRec(sad)} />
//         <img src={like} onClick={() => giveRec(like)} />
//         <img src={love} onClick={() => giveRec(love)} />
//       </div>
//     ) : (
//       <div></div>
//     )}

//     {recGiven ? (
//       <div>
//         <img src={givenEmo} onClick={giveRec} />
//       </div>
//     ) : (
//       <button onClick={toggleReaction}> React </button>
//     )}
//   </DetailsViewContainer>
// );

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
    &:hover {
      background: black;
    }
  }
`;

const Container = styled.div`
color: black;
  cursor: pointer;
  display: grid;

  padding-bottom: 1.2rem;

  background-color: whitesmoke;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  
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

  .details {
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btns {
      display: flex;
      flex-direction: row;
    justify-content: space-around;
    }
  }
 
`;
