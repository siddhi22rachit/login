// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Signup from './components/Auth/Signup';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './components/Profile/ProfilePage';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/> } />

          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
           <Route 
            path="/edit-profile" 
            element={
              <PrivateRoute>
              </PrivateRoute>
            } 
          />
          {/* Add other routes as needed */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;