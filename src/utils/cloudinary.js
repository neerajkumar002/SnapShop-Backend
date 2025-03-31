import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePathName) => {
  try {
    if (!filePathName) {
      return null;
    } 
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(filePathName, {
      resource_type: "image",
    }); 
    return response;
  } catch (error) {
    fs.unlinkSync(filePathName);
    return null;
  }
};

export { uploadOnCloudinary };
