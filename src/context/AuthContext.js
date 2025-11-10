import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // stores { username, role, token }
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (token && role && username) {
      setUser({ token, role, username });
    }
  }, []);

  const login = (data) => {
    const { token, user } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("username", user.username);
    setUser({ token, role: user.role, username: user.username });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
