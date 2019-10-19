import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import Axios from "axios";
import SuccessMessage from "./messages/SuccessMessage";
import { FormContainer } from "./common.style";
import FailureMessage from "./messages/FailureMessage";
import UploadingMessage from "./messages/UploadingMessage";

/**
 * This component is responsible for displaying Image Model
 * for creating new feed.
 */
const AddImageModel = () => {
  // State to store error message
  const [errorMsg, setErrorMsg] = useState("");
  // Stores uploaded image refresh in state
  const [image, setImage] = useState(null);
  // Controlled title imput value
  const [title, setTitle] = useState("");
  // Image Url of currently uploaded image just to show it as it is uploading
  const [imageUrl, setImageUrl] = useState(null);
  // Loading flag for showing Spinner before fetching all data
  const [uploading, setUploading] = useState(false);
  // Flag to check whether the uploading image is a success or not
  const [success, setSuccess] = useState("");

  // Handles uploading of image to the server
  const postHandler = async () => {
    // Instance of FormData() to get reference to the form and append data to it
    let formData = new FormData();
    formData.append("myImg", image);
    formData.append("title", title);

    setUploading(true);

    // Post image and title to /feeds api
    let res = await Axios.post("http://localhost:5000/feeds", formData);

    // If there is some error in image, store that message in state
    if (res.data.errMsg) {
      setErrorMsg(res.data.errMsg);
    }
    setUploading(false);
    // Set success message
    setSuccess(
      <SuccessMessage
        headerTxt="Your image is successfully uploaded!"
        content="Check your profile to see it or simply refresh."
      />
    );
  };
  // Invoke the hidden button btnClickForImageUpload using this function
  const chooseBtnClickHandler = () => {
    document.getElementById("btnClickForImageUpload").click();
  };

  // The function is responsible for reading the image file from user's pc
  const fileChangedHandler = e => {
    let reader = new FileReader();
    // get uploaded file
    let file = e.target.files[0];
    // Change state based on whether the file is loaded or not
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
    };
    // Set the image as the default data url of the reader instance
    reader.readAsDataURL(file);
  };

  return (
    <Modal size="mini" trigger={getTriggerForModel()}>
      <Modal.Header>Create a Feed</Modal.Header>
      <Modal.Content>
        <FormContainer>
          {/* If imageUrl is present show that Image */}
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
            <i className="icon plus"></i>
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
            <UploadingMessage
              message={`Just one Second`}
              feedback={`We are uploading that content for you.`}
            />
          ) : (
            <Button primary onClick={postHandler}>
              Create
            </Button>
          )}
          {errorMsg ? (
            <FailureMessage
              errorMsg={errorMsg}
              headerTxt={`We're sorry we can't upload this image.`}
            />
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

// Returns triggers UI for above model
const getTriggerForModel = () => (
  <div style={{ marginRight: "1rem" }}>
    <Button>
      <i className="icon plus"></i>
      Add Feed
    </Button>
  </div>
);
