import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import axios from '../utils/axios';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signup = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const response = await axios.post('/users/signup', {
        uid: userCredential.user.uid,
        email,
        ...additionalData,
      });
      setCurrentUser(response.data);
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const response = await axios.get(`/users/${userCredential.user.uid}`);
      setCurrentUser(response.data);
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      setError(error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const response = await axios.post('/users/google-signup', {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
      });
      setCurrentUser(response.data);
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const response = await axios.get(`/users/${user.uid}`);
          setCurrentUser(response.data);
          setError(null);
        } catch (error) {
          console.error('Fetch user error:', error);
          setError(error);
          // If user fetch fails, you might want to sign out
          await logout();
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Provide the context with all authentication methods and state
  const authContextValue = {
    currentUser,
    loading,
    error,
    signup,
    login,
    googleSignIn,
    logout,
    setCurrentUser,
    setError
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};