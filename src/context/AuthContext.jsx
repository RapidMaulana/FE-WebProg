import React, { createContext, useState, useEffect, useCallback } from "react";
import instance from "../api/api_instance";
import {
  login,
  logout,
  getProfile,
  isAuthenticated,
  getAuthToken,
  setAuthToken,
} from "../api/auth_services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user saat app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Cek token dari localStorage
        const token = getAuthToken();
        console.log("Token ditemukan:", !!token);
        
        if (token) {
          // Set token di axios header sebelum request
          instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
          // Tunggu sebentar agar header terupdate
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const userData = await getProfile();
          console.log("User loaded successfully:", userData);
          setUser(userData);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load user:", err.response?.data || err.message);
        setAuthToken(null); // Clear invalid token
        setUser(null);
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
      // Token sudah disimpan di services.js, tapi kita pastikan lagi
      const token = getAuthToken();
      if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
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