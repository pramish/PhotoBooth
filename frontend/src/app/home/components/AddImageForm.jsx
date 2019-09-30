import React, { useState } from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import ImageUploader from "react-images-upload";

const AddImageForm = () => {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Fiction");

  const onDrop = image => {
    setImage(image);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log({
      image,
      email,
      category
    });
  };
  const handleChange = e => {
    switch (e.target.name) {
      case "image":
        setImage(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Card style={{ color: "black" }}>
      <form onSubmit={handleSubmit}>
        <ImageUploader
          withIcon={true}
          buttonText="Choose a image"
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage={true}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Email"
          name="email"
          value={email}
        />
        <label>Email</label> <br />
        <Button type="submit" primary>
          Create{" "}
        </Button>
      </form>
    </Card>
  );
};

export default AddImageForm;
