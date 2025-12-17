import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  login,
  logout,
  getProfile,
  isAuthenticated,
  getAuthToken,
  setAuthToken,
} from "../services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user saat app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (isAuthenticated()) {
          const userData = await getProfile();
          setUser(userData);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogin = useCallback(async (email, password) => {
    try {
      setError(null);
      const userData = await login({ email, password });
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login gagal";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};