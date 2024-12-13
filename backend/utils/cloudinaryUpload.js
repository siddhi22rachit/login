// server/utils/cloudinaryUpload.js
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary configuration


export const uploadToCloudinary = async (filePath) => {
  try {

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'user_profiles',
      transformation: [
        { width: 500, height: 500, crop: 'fill' }
      ]
    });

    // Remove local file after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};