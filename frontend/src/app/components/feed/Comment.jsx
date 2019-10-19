import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Axios from "axios";
import PropTypes from "prop-types";
import { Comment, Button } from "semantic-ui-react";

/**
 * The CommentAndReplies components renders the appropriate comment and its reply.
 * As Comment and Replies are technically the same thing with Replies having a small
 * margin of 1rem towards its left.
 */
const CommentAndReplies = props => {
  const { comment } = props;
  // State For storing replies of the comments
  const [replies, setReplies] = useState([]);
  // Loading flag for showing Spinner before fetching all replies
  const [loadingReplies, setLoadingReplies] = useState(true);
  // Stores uploaded image refresh in state
  const [image, setImage] = useState(null);
  // Image Url of currently uploaded image just to show it as it is uploading
  const [imageUrl, setImageUrl] = useState(null);
  // State to store Empty error message
  const [emptyError, setEmptyError] = useState();
  // State to store error message
  const [errorMsg, setErrorMsg] = useState("");
  // Loading flag for showing Spinner before fetching all data (just during uploading)
  const [uploading, setUploading] = useState(false);

  // Responsbile for fetching replies of the comments
  const handleReplyClick = async comments => {
    // If there is not comments of the comments, Show no replies
    if (comments.length === 0) {
      setEmptyError("No Replies!");
      console.log(emptyError);
    } else {
      // Else fetch all the commengts
      const replies = await Axios.get(
        `http://localhost:5000/feeds/${comment._id}`
      );
      setReplies(replies.data);
      setLoadingReplies(false);
    }
  };

  // Handles uploading of image to the server
  const postHandler = async id => {
    // Instance of FormData() to get reference to the form and append data to it
    let formData = new FormData();
    formData.append("myImg", image);

    setUploading(true);
    // Create new comment passing in that image
    let res = await Axios.post(
      `http://localhost:5000/feeds/comment/${id}`,
      formData
    );
    // If error set the error state
    if (res.data.errMsg) {
      setErrorMsg(res.data.errMsg);
    }
    setUploading(false);
  };

  // Invoke the hidden button btnClickForImageUploader using this function
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

  return (
    <div>
      <Comment>
        <div className="ui card">
          <div className="image" style={{ margin: "auto" }}>
            <img
              src={comment.image}
              style={{ height: "16rem", width: "auto" }}
            />
          </div>
          <div className="content">
            <div className="header">
              <span className="date">
                <div>
                  <Moment fromNow>{comment.createdAt}</Moment>
                </div>
              </span>
            </div>
            <div className="meta">
              <div>{comment.comments.length} response</div>
              <div>{comment.emoji.length} reaction</div>
            </div>
            <div
              className="extra content"
              onClick={() => handleReplyClick(comment.comments)}
            >
              <span style={{ marginRight: "0.5rem" }}></span>
              See Replies
            </div>
          </div>
        </div>
        {emptyError ? (
          <div style={{ marginLeft: "1rem" }}>
            <div>{emptyError}</div>
            <button
              onClick={chooseBtnClickHandler}
              className="ui button active"
            >
              <i class="upload icon"></i> Choose A Image
            </button>
            <br />
            <br />
            <Button
              onClick={() => postHandler(comment._id)}
              content="Post Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </div>
        ) : (
          ""
        )}
        {!loadingReplies && (
          <div style={{ marginLeft: "1rem" }}>
            <CommentAndReplies comment={replies} />
            <div>
              <div>{emptyError}</div>
              <button
                onClick={chooseBtnClickHandler}
                className="ui button active"
              >
                <i class="upload icon"></i> Choose A Image
              </button>
              <br />
              <br />
              <Button
                onClick={() => postHandler(comment._id)}
                content="Post Reply"
                labelPosition="left"
                icon="edit"
                primary
              />
            </div>
          </div>
        )}
      </Comment>
    </div>
  );
};

CommentAndReplies.propTypes = {
  comment: PropTypes.object.isRequired
};

export default CommentAndReplies;
