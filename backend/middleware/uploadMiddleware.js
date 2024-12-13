// server/middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile-images/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.uid}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const uploadMiddleware = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// server/controllers/userController.js
export const uploadProfileImage = async (req, res) => {
  try {
    const uid = req.params.uid;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct the URL path for the uploaded image
    const imageUrl = `/uploads/profile-images/${file.filename}`;

    // Update user's profile image in database
    await User.findOneAndUpdate(
      { uid }, 
      { profileImage: imageUrl }, 
      { new: true }
    );

    res.status(200).json({ 
      message: 'Profile image uploaded successfully', 
      imageUrl 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};