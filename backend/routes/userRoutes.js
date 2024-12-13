// server/routes/userRoutes.js
import express from 'express';
import { 
  createUser, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/userController.js';
// server/routes/userRoutes.js
import { 
  updateUserProfile, 
  uploadProfileImage, 
  deleteUserAccount,
  getUserProfile 
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';


const router = express.Router();

router.post('/signup', createUser);
router.post('/google-signup', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);




// Protected routes requiring authentication
router.put('/:uid', authMiddleware, updateUserProfile);
router.delete('/:uid', authMiddleware, deleteUserAccount);

// Profile image upload route
router.post('/:uid/upload-image', 
  authMiddleware, 
  uploadMiddleware.single('profileImage'), 
  uploadProfileImage
);

// Public route to fetch user profile (for QR code sharing)
router.get('/:uid', getUserProfile);

export default router;