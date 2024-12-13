// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true
}));

app.use(express.json());

connectDB();

// Update routes to match the new path
app.use('/api/users', userRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;  // Store your JWT secret in environment variables

// Function to generate a new JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Regenerate a token (e.g., after login or when the token expires)
app.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  // Verify the refresh token (you may store refresh tokens in a database or another secure place)
  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate a new JWT token
    const newToken = generateToken(decoded.userId);
    res.json({ token: newToken });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});