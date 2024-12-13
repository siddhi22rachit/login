// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const createUserProfile = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user profile', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile', error);
    throw error;
  }
};