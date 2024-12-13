import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const [editData, setEditData] = useState({
    name: currentUser?.name || '',
    phoneNumber: currentUser?.phoneNumber || '',
    gender: currentUser?.gender || '',
    profileImage: currentUser?.profileImage || 'https://via.placeholder.com/150'
  });

  // Interactive Image Effect
  const handleMouseMove = (e) => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;

    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    // Calculate percentage movement
    const xPercent = (mouseX / containerRect.width - 0.5) * 20;
    const yPercent = (mouseY / containerRect.height - 0.5) * 20;

    image.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
  };

  const resetImagePosition = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'translate(0, 0)';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      // Ensure currentUser exists and has all necessary properties
      if (currentUser) {
        // Directly use the UID from currentUser
        const response = await axios.post(`/api/users/${currentUser.uid}/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setEditData(prev => ({
          ...prev,
          profileImage: response.data.imageUrl
        }));
      } else {
        console.error('Current user is not authenticated');
      }
    } catch (error) {
      console.error('Image upload failed', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/users/${currentUser.uid}`, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`/api/users/${currentUser.uid}`);
        await logout();
        navigate('/signup');
      } catch (error) {
        console.error('Delete account failed', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Generate shareable profile URL
  const shareableProfileUrl = `${window.location.origin}/profile/${currentUser.uid}`;

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetImagePosition}
        className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 transform transition-all hover:scale-105"
      >
        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="flex flex-col items-center">
              <img 
                ref={imageRef}
                src={editData.profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover mb-4 transition-transform"
              />
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
            </div>
            
            <input 
              type="text" 
              name="name" 
              value={editData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            
            <input 
              type="tel" 
              name="phoneNumber" 
              value={editData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex items-center space-x-4">
              <label className="font-medium">Gender:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={editData.gender === 'male'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={editData.gender === 'female'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                type="submit" 
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                Save
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetImagePosition}
              className="flex flex-col items-center"
            >
              <img 
                ref={imageRef}
                src={currentUser.profileImage || 'https://via.placeholder.com/150'} 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg transition-transform"
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentUser.name}</h2>
              <p className="text-gray-600 mb-4">{currentUser.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Phone</h3>
                <p>{currentUser.phoneNumber || 'Not provided'}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Gender</h3>
                <p>{currentUser.gender || 'Not specified'}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold mb-2">Shareable Profile QR</h3>
                <div className="flex justify-center">
                  <QRCode 
                    value={shareableProfileUrl} 
                    size={128} 
                    className="border-2 border-gray-200 rounded-lg p-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
              <div className="flex space-x-4">
                <button 
                  onClick={handleLogout}
                  className="w-1/2 bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition"
                >
                  Logout
                </button>
                <button 
                  onClick={handleDelete}
                  className="w-1/2 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
