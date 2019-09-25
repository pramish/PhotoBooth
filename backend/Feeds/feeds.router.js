const express = require('express');
const upload = require('../config/services/imageUpload')
const singleUpload = upload.single('image'); // this will allow users to upload the image once at a time.
const router = express.Router();

//@routes POST api/feeds/upload
// @desc Upload the image to S3 but later on it will change to Cloudinary.
//@access Private
router.post('/upload', (req, res) => {
  singleUpload(req, res, err => {
    res.json({
      imageLocation: req.file.location //Using this image location to get the required image in front end
    });
  });
});

//@routes POST api/feeds/deleteFeeds
//@desc Delete the feeds requested upon the users.
// @access Private

router.post('/deleteFeeds',(req,res)=>{
  
})

module.exports = router