import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userService } from "../services/user.service";

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

  const giveRec = (emoji, type) => {
    const data = {
      type: type
    };
    setRecGiven(!recGiven);
    // if (emoji && emoji === givenEmo) {
    //   userService
    //     .addEmoji(feed._id, data)
    //     .then(res => console.log("old emo:" + res.data));
    // }
    setGivenEmo(emoji);
    userService.addEmoji(feed._id, data).then(res => console.log(res.data));
    setReaction(!reaction);
  };

  return (
    <Container className="ui card eachfeed">
      <div className="content"></div>
      <div className="image" onClick={() => history.push(`/feed/${feed._id}`)}>
        <img src={feed.image} />
      </div>

      <div className="extra content">
        <div className="ui large transparent left icon input">
          <span>{feed.title}</span>
        </div>
      </div>
      <div className="content">
        <span className="right floated">
          <DetailsView
            image={boy}
            reaction={reaction}
            toggleReaction={toggleReaction}
            givenEmo={givenEmo}
            giveRec={(emoji, type) => giveRec(emoji, type)}
            recGiven={recGiven}
          />
        </span>
        <i className="comment icon"></i>3 comments
      </div>
    </Container>
  );
};

export default EachFeed;

const DetailsView = ({
  image,
  reaction,
  toggleReaction,
  givenEmo,
  giveRec,
  recGiven
}) => (
  <div>
    {reaction ? (
      <div style={{ backgroundColor: "#ffffff" }}>
        <img
          style={{ width: "2rem", height: "2rem" }}
          src={laugh}
          onClick={() => giveRec(laugh, "laugh")}
        />
        <img
          style={{ width: "2rem", height: "2rem" }}
          src={smile}
          onClick={() => giveRec(smile, "smile")}
        />
        <img
          style={{ width: "2rem", height: "2rem" }}
          src={sad}
          onClick={() => giveRec(sad, "sad")}
        />
        <img
          style={{ width: "2rem", height: "2rem" }}
          src={like}
          onClick={() => giveRec(like, "like")}
        />
        <img
          style={{ width: "2rem", height: "2rem" }}
          src={love}
          onClick={() => giveRec(love, "love")}
        />
      </div>
    ) : (
      <div></div>
    )}

    {recGiven ? (
      <div>
        <img
          style={{ width: "2rem", height: "2rem" }}
          src={givenEmo}
          onClick={giveRec}
        />
      </div>
    ) : (
      <button onClick={toggleReaction}> React </button>
    )}
  </div>
);

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
