// context/AuthContext.js
import React, { createContext, useState } from 'react';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock register function
  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com') {
          resolve('Registration successful');
        } else {
          reject(new Error('Registration failed. Please try again.'));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Mock login function
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login for a specific email and password
        if (email === 'test@example.com' && password === 'password123') {
          setUser({ email }); // Set user state on successful login
          resolve(true); // Indicate successful login
        } else {
          reject(new Error('Invalid email or password')); // Indicate login failure
        }
      }, 1000); // Simulate network delay
    });
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};
