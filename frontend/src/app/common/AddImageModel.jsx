import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Header, Modal, Form, Message, Icon } from "semantic-ui-react";
import Axios from "axios";
import styled from "styled-components";

const AddImageModel = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const postHandler = async () => {
    let formData = new FormData();
    formData.append("myImg", image);
    formData.append("title", title);
    setUploading(true);
    let res = await Axios.post("/feeds", formData);
    if (res.data.errMsg) {
      setErrorMsg(res.data.errMsg);
    }
    setUploading(false);
    setSuccess(getSuccessMsg());
  };

  const chooseBtnClickHandler = () => {
    document.getElementById("btnClickForImageUpload").click();
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
    <Modal
      size="mini"
      trigger={
        <div style={{ marginRight: "1rem" }}>
          <Button>
            <i className="icon plus"></i>
            Add Feed
          </Button>
        </div>
      }
    >
      <Modal.Header>Create a Feed</Modal.Header>
      <Modal.Content>
        <FormContainer>
          {imageUrl ? (
            <img style={{ height: "16rem", width: "auto" }} src={imageUrl} />
          ) : (
            ""
          )}
          <br />
          <input
            style={{ display: "none" }}
            type="file"
            name="image"
            id="btnClickForImageUpload"
            onChange={fileChangedHandler}
          />
          <Button onClick={chooseBtnClickHandler}>
            {image ? (
              <i className="icon plus"></i>
            ) : (
              <i className="icon plus"></i>
            )}
            {image ? "Change Image" : "Choose a image"}
          </Button>

          <Form.Field>
            <input
              placeholder="Give a meaningful title"
              id="title"
              aria-describedby="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Field>

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
            <Button primary onClick={postHandler}>
              Create
            </Button>
          )}

          {errorMsg ? (
            <Message negative>
              <Message.Header>
                We're sorry we can't upload this image.
              </Message.Header>
              <p>{errorMsg}</p>
            </Message>
          ) : (
            ""
          )}
          {success}
        </FormContainer>
      </Modal.Content>
    </Modal>
  );
};

export default AddImageModel;

const getSuccessMsg = () => (
  <Message
    success
    header="Your image is successfully uploaded!"
    content="Check your profile to see it or simply refresh."
  />
);

const FormContainer = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .field {
    margin-top: 1rem;
  }
  form {
    display: flex;
    justify-content: space-evenly !important;
    flex-direction: column;
    align-items: flex-start !important;
  }
`;
