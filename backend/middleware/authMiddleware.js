import admin from '../firebase/admin.js'; // Import your Firebase admin SDK

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  const token = authHeader.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Attach the decoded token to the request
    req.user = decodedToken;
    
    // Verify that the token matches the user ID in the route
    if (decodedToken.uid !== req.params.uid) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    // Check if the token is expired
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }

    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
