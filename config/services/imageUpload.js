const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../keys');

//configuration of aws keys
aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: config.region
});
//creating new instance of S3
const s3 = new aws.S3();

//Upload the image to Amazon S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'aipphotobooth',
    metadata: function(req, res, cb) {
      cb(null, { fieldName: 'Uplaoding the image to Amazon S3' });
    },
    key: function(req, res, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
