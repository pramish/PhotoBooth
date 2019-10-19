import React from "react";
import PropTypes from "prop-types";
// Emojis images
import laugh from "../../../assets/emojis/laugh.png";
import like from "../../../assets/emojis/like.png";
import sad from "../../../assets/emojis/sad.png";
import smile from "../../../assets/emojis/smile.png";
import love from "../../../assets/emojis/love.png";

/**
 * This component renders Emojis with number of reactions
 * and responses.
 */
const DetailsView = ({
  reaction,
  toggleReaction,
  givenEmo,
  giveRec,
  recGiven
}) => {
  return (
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
      <div></div>
      {recGiven ? (
        <div>
          <img
            style={{ width: "2rem", height: "2rem" }}
            src={givenEmo}
            onClick={giveRec}
          />
        </div>
      ) : (
        <button onClick={toggleReaction} className="ui teal basic button">
          <i className="thumbs up outline"></i> React
        </button>
      )}
    </div>
  );
};

DetailsView.propTypes = {
  image: PropTypes.string,
  giveEmo: PropTypes.string,
  giveRec: PropTypes.func,
  toggleReaction: PropTypes.func,
  reaction: PropTypes.bool
};

export default DetailsView;
