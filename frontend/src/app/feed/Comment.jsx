import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Axios from "axios";

import { Comment, Button } from "semantic-ui-react";
import ReplyComment from "./Reply";

const CommentAndReplies = props => {
  const { comment } = props;
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(true);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [emptyError, setEmptyError] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleReplyClick = async comments => {
    console.log(comments);
    if (comments.length === 0) {
      setEmptyError("No Replies!");
      console.log(emptyError);
    }

    // const replies = await Axios.get(`http://localhost:5000/feeds/${commentId}`);
    // setReplies(replies.data);
    // setLoadingReplies(false);
    // console.log(replies);
  };

  const postHandler = async id => {
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
              <i className="comment outline icon"></i>
              <span style={{ marginRight: "0.5rem" }}></span>
              Reply
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

export default CommentAndReplies;
