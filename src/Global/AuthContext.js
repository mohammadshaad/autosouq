import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Config/Config';

// Create an authentication context
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  // Function to log in
  const login = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  // Function to log out
  const logout = async () => {
    await auth.signOut();
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
