import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

// Use environment variables for API URL
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  validateToken: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 
  const isAuthenticated = !!user;

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        const isValid = await validateToken();
        if (isValid) {
          await fetchUserData();
        } else {
          await logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Fetch user data from the server
  const fetchUserData = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const response = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      await logout();
    }
  };

  // Login method
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token, user } = await response.json();

      // Store token securely
      await SecureStore.setItemAsync('authToken', token);
      setUser(user); // Set user data in state
      router.replace('/(protected)/(tabs)/home'); // Navigate to home screen
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout method
  const logout = async () => {
    await SecureStore.deleteItemAsync('authToken'); // Remove token
    setUser(null); // Clear user data
    router.replace('/(public)/sign-in'); // Navigate to login screen
  };

  // Validate token method
  const validateToken = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/validate-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Token validation failed');
      }

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    validateToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};