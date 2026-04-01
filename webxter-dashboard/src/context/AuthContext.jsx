import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('webxter_token'));
  const [loading, setLoading] = useState(true); // true while checking persisted session
  const [error, setError] = useState(null);

  // On mount — restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('webxter_user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        clearSession();
      }
    }
    setLoading(false);
  }, [token]);

  const saveSession = (userData, authToken) => {
    localStorage.setItem('webxter_token', authToken);
    localStorage.setItem('webxter_user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    setError(null);
  };

  const clearSession = () => {
    localStorage.removeItem('webxter_token');
    localStorage.removeItem('webxter_user');
    setToken(null);
    setUser(null);
  };

  // Login with email + password
  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const { data } = await authAPI.login(email, password);
      saveSession(data.user, data.token);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    }
  }, []);

  // Sign up
  const signup = useCallback(async (name, email, password) => {
    setError(null);
    try {
      const { data } = await authAPI.signup(name, email, password);
      saveSession(data.user, data.token);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    }
  }, []);

  // Google OAuth
  const googleAuth = useCallback(async (googleToken) => {
    setError(null);
    try {
      const { data } = await authAPI.googleAuth(googleToken);
      saveSession(data.user, data.token);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Google sign-in failed.';
      setError(msg);
      return { success: false, message: msg };
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try { await authAPI.logout(); } catch { /* ignore */ }
    clearSession();
  }, []);

  // Update user info locally (after profile edit)
  const updateLocalUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('webxter_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      error,
      isAuthenticated,
      login,
      signup,
      googleAuth,
      logout,
      updateLocalUser,
      clearError: () => setError(null),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
