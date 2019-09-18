import React from "react";
import styled from "styled-components";
import { FaComment } from "react-icons/fa";

import meme from "../../assets/meme.jpg";
import girl from "../../assets/default-girl.png";

const EachFeed = () => {
  return (
    <Container>
      <div className="topAvatarConatiner">
        <img className="avatar" src={girl} alt="girl" />
        <span>Funny</span>
        <span> &bull;</span>
        <span>2h</span>
      </div>
      <h4 className="title">Typical India</h4>
      <div className="imgContainer">
        <img src={meme} />
      </div>
      <div>
        <span>200 reactions</span>
        <span> &bull;</span>
        <span>47 comments</span>
      </div>
      <div>
        <button>Emoji</button>
        <button>
          <FaComment />
        </button>
      </div>
    </Container>
  );
};

export default EachFeed;

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  div.topAvatarConatiner {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  h4 {
    margin: 0;
  }

  img.avatar {
    height: 2.5rem;
    width: 2.5rem;
  }

  div.imgContainer {
    img {
      background-size: cover;
      background-position: center;
    }
  }
`;
