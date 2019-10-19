import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Loader, Comment, Button, Grid, Header, Form } from "semantic-ui-react";
import Axios from "axios";

import Navbar from "../common/Navbar";
import CommentAndReplies from "./Comment";
import { FeedContainer } from "./feed.style";
import UploadingMessage from "../common/messages/UploadingMessage";

/**
 * The component fetches the  specific feed from the params and renders them in home UI.
 */
const Feed = props => {
  // Loading flag for showing Spinner before fetching all data
  const [fetching, setFetching] = useState(true);
  const [feed, setFeed] = useState({});
  // Store the reference to the id of params object
  let id = props.match.params.id;
  // State to store error message
  const [errorMsg, setErrorMsg] = useState("");
  // Uploading flag for showing Spinner before uploading all data
  const [uploading, setUploading] = useState(false);
  // Stores uploaded image refresh in state
  const [image, setImage] = useState(null);
  // Image Url of currently uploaded image just to show it as it is uploading
  const [imageUrl, setImageUrl] = useState(null);
  const [comments, setComments] = useState([]);

  // Handles uploading of image to the server
  const postHandler = async () => {
    let formData = new FormData();
    formData.append("myImg", image);
    setUploading(true);
    let res = await Axios.post(
      `http://localhost:5000/feeds/comment/${id}`,
      formData
    );

    // Set error state if there is an error
    if (res.data.errMsg) {
      setErrorMsg(res.data.errMsg);
    }
    setUploading(false);
  };

  // Invoke the hidden button btnClickForImageUpload using this function
  const chooseBtnClickHandler = async () => {
    document.getElementById("btnClickForImageUploader").click();
  };

  // The function is responsible for reading the image file from user's pc
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
    // Get the specific image from server using id
    Axios.get(`http://localhost:5000/feeds/${id}`).then(res => {
      setFeed(res.data);
      // If it has comments set all the comment to the state
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
                    {/* Map through the comments and renders them */}
                    {comments.map(comment => (
                      <div style={{ marginTop: "1rem" }}>
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
                      {/* Feed back while uploading */}
                      {uploading ? (
                        <>
                          <UploadingMessage
                            message="Just one second"
                            feedback="We are uploading that content for you."
                          />
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

export default Feed;
