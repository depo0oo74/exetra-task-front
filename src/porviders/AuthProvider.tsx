import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

type AuthProviderProps = {
    children: React.ReactNode;
};
  
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // states
  const [authenticated, setAuthenticated] = useState(false);

  // Function to handle check auth
  const checkAuth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setAuthenticated(data.authenticated);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthenticated(false);
    }
  };

  // Use effect to call check auth on mounted
  useEffect(() => {
    checkAuth();
  }, []);

  // Function to handle logout
  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setAuthenticated(false);
    }
  };

  const value = {
    authenticated,
    checkAuth,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};