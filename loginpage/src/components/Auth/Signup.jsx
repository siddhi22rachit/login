// client/src/components/Auth/Signup.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    profilePhoto: null,
    coverPhoto: null
  });
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.email, formData.password, {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender
      });
      navigate('/profile');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleSignIn();
      navigate('/profile');
    } catch (error) {
      console.error('Google Signup failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            required 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.password}
            onChange={handleChange}
          />
          <input 
            type="tel" 
            name="phoneNumber" 
            placeholder="Phone Number" 
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <div className="flex items-center space-x-4">
            <label className="block text-gray-700">Gender:</label>
            <div className="flex items-center">
              <input 
                type="radio" 
                name="gender" 
                value="male" 
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="mr-4">Male</span>
              <input 
                type="radio" 
                name="gender" 
                value="female" 
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Female</span>
            </div>
          </div>
          <input 
            type="file" 
            name="profilePhoto" 
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <button 
            type="submit" 
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <button 
            onClick={handleGoogleSignup}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;