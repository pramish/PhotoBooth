import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  Card,
  Image,
  Loader,
  Icon,
  Dimmer,
  Segment,
  Comment,
  Button,
  Grid,
  Header,
  Form,
  Message
} from "semantic-ui-react";
import Axios from "axios";
// import { useHistory } from "react-router-dom";

import Navbar from "../common/Navbar";
import CommentAndReplies from "./Comment";

const Feed = props => {
  const [fetching, setFetching] = useState(true);
  const [feed, setFeed] = useState({});
  let id = props.match.params.id;
  const [errorMsg, setErrorMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [comments, setComments] = useState([]);

  // let history = useHistory();

  const postHandler = async () => {
    let formData = new FormData();
    formData.append("myImg", image);

    setUploading(true);
    let res = await Axios.post(
      `http://localhost:5000/feeds/comment/${id}`,
      formData
    );

    if (res.data.errMsg) {
      setErrorMsg(res.data.errMsg);
    }
    setUploading(false);
    props.history.replace(`/feed/${id}`);
  };

  const chooseBtnClickHandler = async () => {
    document.getElementById("btnClickForImageUploader").click();
  };
  const fileChangedHandler = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/feeds/${id}`).then(res => {
      setFeed(res.data);
      if (res.data.comments.length > 0) {
        setComments(res.data.comments);
        console.log(res.data.comments);
      }
      setFetching(false);
    });
  }, []);
  return (
    <FeedContainer>
      <Navbar history={props.history} />
      <div
        style={{
          marginBottom: "1rem",
          position: "fixed",
          top: "7rem",
          left: "0.5rem",
          zIndex: "1"
        }}
        onClick={() => props.history.goBack()}
      >
        <Button>
          <i className="icon arrow alternate circle left outline"></i>
          Go Back
        </Button>
      </div>
      {fetching ? (
        <Loader size="large">Loading</Loader>
      ) : (
        <div>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="left-img">
                  <img
                    src={feed.image}
                    style={{ height: "40em", width: "auto" }}
                  />
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="comments">
                  <Comment.Group>
                    <Header as="h3" dividing>
                      Comments
                    </Header>
                    {comments.map(comment => (
                      <div>
                        <CommentAndReplies comment={comment} />
                      </div>
                    ))}
                    <Form reply>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        name="image"
                        id="btnClickForImageUploader"
                        onChange={fileChangedHandler}
                      />
                      {imageUrl ? (
                        <img
                          style={{ height: "16rem", width: "auto" }}
                          src={imageUrl}
                        />
                      ) : (
                        ""
                      )}
                      <br />
                      {uploading ? (
                        <>
                          <Message icon>
                            <Icon name="circle notched" loading />
                            <Message.Content>
                              <Message.Header>Just one second</Message.Header>
                              We are uploading that content for you.
                            </Message.Content>
                          </Message>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={chooseBtnClickHandler}
                            className="ui button active"
                          >
                            <i class="upload icon"></i> Choose A Image
                          </button>
                          <br />
                          <br />
                          <Button
                            onClick={postHandler}
                            content="Post Comment"
                            labelPosition="left"
                            icon="edit"
                            primary
                          />
                        </>
                      )}
                    </Form>
                  </Comment.Group>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )}
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  .left-img {
    position: fixed;
    margin-top: 11rem;
    max-width: 50vw;
    min-width: 50vw;
    width: 100%;
    margin-left: 3rem;
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .comments {
    margin-left: 2rem;
    margin-top: 6rem;
  }
`;

export default Feed;
