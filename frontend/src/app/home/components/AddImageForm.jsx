import React, { useState } from 'react';
import Axios from 'axios';
import {
  Card,
  Button,
  FormControl,
  InputLabel,
  Input,
  Fab
} from '@material-ui/core';
import { PlayForWork, CloudUpload, Replay } from '@material-ui/icons';

import styled from 'styled-components';

const AddImageForm = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState(null);

  const postHandler = async () => {
    let formData = new FormData();
    formData.append('myImg', image);
    let res = await Axios.post('/feeds', formData);
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
  const chooseBtnClickHandler = () => {
    document.getElementById('btnClickForImageUpload').click();
  };

  return (
    <Card style={{ color: 'black', padding: '3rem' }}>
      <Wrapper>
        <form>
          {imageUrl ? (
            <img style={{ height: '16rem', width: 'auto' }} src={imageUrl} />
          ) : (
            ''
          )}
          <br />
          <input
            style={{ display: 'none' }}
            type='file'
            name='image'
            id='btnClickForImageUpload'
            onChange={fileChangedHandler}
          />
          <Fab variant='extended' onClick={chooseBtnClickHandler}>
            {image ? <Replay /> : <PlayForWork />}
            {image ? 'Change Image' : 'Choose a image'}
          </Fab>

          <FormControl>
            <InputLabel htmlFor="title">{title}</InputLabel>
            <Input name="title" id="title" aria-describedby="title" />
          </FormControl>
          <Button color='secondary' onClick={postHandler}>
            Create a Feed
          </Button>
        </form>
      
      </Wrapper>
    </Card>
  );
};

export default AddImageForm;

const Wrapper = styled.div`
  form {
    display: flex;

    flex-direction: column;
    .MuiSvgIcon-root {
      margin-left: 0.5rem !important;
      margin-right: 0.5rem !important;
    }
  }
`;
