import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../common/Navbar";
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

const Feed = props => {
  const [fetching, setFetching] = useState(true);
  const [feed, setFeed] = useState({});
  let id = props.match.params.id;
  const [errorMsg, setErrorMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [comments, setComments] = useState([]);

  const postHandler = async () => {
    let formData = new FormData();
    formData.append("myImg", image);

    setUploading(true);
    let res = await Axios.post(
      `/feeds/comment/${id}`,
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
    Axios.get(`/feeds/${id}`).then(res => {
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
        onClick={() => props.history.push("/home")}
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
                  <Image src={feed.image} wrapped ui={false} />
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="comments">
                  <Comment.Group>
                    <Header as="h3" dividing>
                      Comments
                    </Header>
                    {/* TODO:Comments here */}
                    {comments.map(comment => (
                      <Comment>
                        <Comment.Content>
                          <Comment.Author as="a">
                            Author Name Here
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>{comment.createdAt}</div>
                          </Comment.Metadata>
                          <img
                            src={comment.image}
                            style={{ height: "16rem", width: "auto" }}
                          />
                          {/* <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                          </Comment.Actions> */}
                        </Comment.Content>
                      </Comment>
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
                          <Button
                            onClick={chooseBtnClickHandler}
                            content="Choose Image"
                            labelPosition="left"
                          />
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
