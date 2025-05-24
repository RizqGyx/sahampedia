import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      location.pathname.startsWith("/admin") ||
      location.pathname === "/login"
    ) {
      const checkSession = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/v1/users/session-check",
            {
              withCredentials: true,
            }
          );
          setIsAuthenticated(res.data.logged_in);
        } catch (err) {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };

      checkSession();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  const login = async (username, password) => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/users/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const res = await axios.get(
        "http://localhost:5000/api/v1/users/session-check",
        { withCredentials: true }
      );

      // console.log(res.data.logged_in);
      setIsAuthenticated(res.data.logged_in);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/api/v1/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
