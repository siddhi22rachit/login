// server/controllers/userController.js
import User from '../models/User.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';


export const createUser = async (req, res) => {
  try {
    const { uid, email, name, phoneNumber, gender } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ uid });
    
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      uid,
      email,
      name,
      phoneNumber,
      gender
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.id });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, phoneNumber, gender } = req.body;
    
    const user = await User.findOneAndUpdate(
      { uid: req.params.id },
      { name, phoneNumber, gender },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ uid: req.params.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// server/controllers/userController.js

export const createUserProfile = async (req, res) => {
  try {
    const { 
      uid, 
      email, 
      name = '', 
      phoneNumber = '', 
      gender = '', 
      profileImage = 'https://via.placeholder.com/150' 
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // Create new user profile
    const newUser = new User({
      uid,
      email,
      name,
      phoneNumber,
      gender,
      profileImage
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ 
      message: 'Error creating user profile', 
      error: error.message 
    });
  }
};
// Update Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    const { name, phoneNumber, gender, profileImage } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { name, phoneNumber, gender, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: `Error updating user with UID: ${uid}`, error: error.message });
  }
};

// Handle image upload
export const uploadProfileImage = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.path);

    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { profileImage: result.secure_url },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      imageUrl: result.secure_url
    });
  } catch (error) {
    res.status(500).json({ message: `Error uploading profile image for UID: ${uid}`, error: error.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const { uid } = req.params;

    const deletedUser = await User.findOneAndDelete({ uid });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      message: 'Account deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting account', 
      error: error.message 
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ uid }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user profile', 
      error: error.message 
    });
  }
};

