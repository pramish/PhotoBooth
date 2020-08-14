require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Checks if there is a environment variable for CLOUDINARY_URL
if (typeof process.env.CLOUDINARY_URL === 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
  console.warn('export CLOUDINARY_URL or set dotenv file');
} else {
  console.log(`Connected with Cloudainary!!`);
}
