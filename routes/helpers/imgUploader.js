const cloudinary = require('cloudinary').v2; //importing the cloudinary libarary

/**
 * @description : Func that will upload image into cloudinary
 * @param {file} imgTobeUploaded
 * @returns url of image uploaded
 */
const imgUploader = async imgTobeUploaded => {
  let response = await cloudinary.uploader.upload(imgTobeUploaded.tempFilePath);
  return { url: response.url, publicId: response.public_id };
};

module.exports = imgUploader;

//this is declared here so that we can use it in another file
