const express = require('express');
const upload = require('../../config/services/imageUpload');
const singleUpload = upload.single('image'); // this will allow users to upload the image once at a time.
const router = express.Router();

//@routes POST api/feeds/updload
// @desc Upload the image to S3 but later on it will change to Cloudinary.
//@access Private
//Uploading the image to Amazon s3 and this has to go to the feeds router.
router.post('/upload', (req, res) => {
  singleUpload(req, res, err => {
    res.json({
      imageLocation: req.file.location //Using this image location to get the required image in front end
    });
  });
});

module.exports = router