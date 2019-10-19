import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userService } from "../../services/user.service";
import PropTypes from "prop-types";
import boy from "../../../assets/default-round.png";

import { EachContainer } from "./home.styles";
import DetailsView from "./DetailsView";

/**
 * This component is responsible for rendering each feed in Home Component
 */
const EachFeed = ({ feed, history }) => {
  // Boolean for toggle of different reactions
  const [reaction, setReaction] = useState(false);
  // It stores the given given reactions
  const [recGiven, setRecGiven] = useState(false);
  const [givenEmo, setGivenEmo] = useState("");

  // Functions that handles the toggle of reaction
  const toggleReaction = () => {
    setReaction(!reaction);
  };

  // Handles the temporary reaction given by the user
  const giveRec = (emoji, type) => {
    const data = {
      type: type
    };
    setRecGiven(!recGiven);
    if (emoji && emoji === givenEmo) {
      userService
        .addEmoji(feed._id, data)
        .then(res => console.log("old emo:" + res.data));
    }
    setGivenEmo(emoji);
    userService.addEmoji(feed._id, data).then(res => console.log(res.data));
    setReaction(!reaction);
  };

  return (
    <EachContainer className="ui card eachfeed">
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
            reaction={reaction}
            toggleReaction={toggleReaction}
            givenEmo={givenEmo}
            giveRec={(emoji, type) => giveRec(emoji, type)}
            recGiven={recGiven}
          />
        </span>
        <div onClick={() => history.push(`/feed/${feed._id}`)}>
          <i className="comment icon"></i>
          {feed.comments.length} response
        </div>
        <div onClick={() => history.push(`/feed/${feed._id}`)}>
          <i className="smile icon"></i>
          {feed.emoji.length} reactions
        </div>
      </div>
    </EachContainer>
  );
};

EachFeed.propTypes = {
  feed: PropTypes.object,
  history: PropTypes.object
};

export default EachFeed;
