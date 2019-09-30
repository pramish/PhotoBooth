import React, { useState } from "react";
import Axios from "axios";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";

const AddImageForm = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const postHandler = async () => {
    let formData = new FormData();
    formData.append("myImg", image);
    let res = await Axios.post("http://localhost:5000/feeds", formData);
    console.log(res);
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
    <Card style={{ color: "black", padding: "10rem" }}>
      <form>
        {imageUrl ? (
          <img style={{ height: "4rem", width: "auto" }} src={imageUrl} />
        ) : (
          <div className="previewText">Please select an Image for Preview</div>
        )}
        <input type="file" name="image" onChange={fileChangedHandler} />

        <Button onClick={postHandler}>Create a Feed</Button>
      </form>
    </Card>
  );
};

export default AddImageForm;
