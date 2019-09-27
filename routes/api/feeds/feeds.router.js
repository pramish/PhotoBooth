const express = require('express');
const router = express.Router();
const app = express();
const Feed = require('./feeds.model');
const cloudinary = require('cloudinary');
const keys = require('../../../config/keys');
const file_upload = require('express-fileupload');
const upload = require('../../../config/multer');
app.use(
  file_upload({
    useTempFiles: true
  })
);
cloudinary.config({
  cloud_name: 'aipphotobooth',
  api_key: keys.APIKEYCloudinary,
  api_secret: keys.APISecreCloudinary
});

//@routes POST api/feeds/upload
// @desc Upload the image to Cloudinary.
//@access Private
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const feed = await new Feed({
      imageLocation: result,
      userEmail: 'abc@gmail.com',
      category: 'fiction',
      views: '20'
    });

    res.json({
      message: 'Image successfully uploaded',
      imageURL: result
    });
    await feed.save();
    console.log('Image has been saved');
  } catch (error) {
    res.status(500).send(error);
  }
});

//@routes POST api/feeds/getImage
// @desc Get the image to Cloudinary.
//@access Private
router.get('/getimage', async (req, res) => {
  const getImage = await Feed.findById(req.params.id);
  if (!getImage) {
    return res.json({
      message: 'Image could not found'
    });
  }
  res.json({
    imageLocation: getImage
  });
});
//@routes POST api/feeds/deleteFeeds
//@desc Delete the feeds requested upon the users.
// @access Private
router.delete('/deleteimage', async (req, res) => {
  const feed = await Feed.findByIdAndDelete(req.params.id);
  if (!feed) {
    return res.json({
      message: 'Images could not be deleted'
    });
  }
  res.json({
    message: 'Images has been deleted'
  });
});

module.exports = router;
