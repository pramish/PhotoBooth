const cloudinary = require("cloudinary").v2;

/**
 * @description : Func that will upload image into cloudinary
 * @param {file} imgTobeUploaded
 * @returns url of image uploaded
 */
const imgUploader = async imgTobeUploaded => {
  let response = await cloudinary.uploader.upload(imgTobeUploaded.tempFilePath);
  return response.url;
};

module.exports = imgUploader;
