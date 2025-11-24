import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('grocerygo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('grocerygo_token') || null;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Set auth state with user object and token
  const setAuth = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    if (userData) localStorage.setItem('grocerygo_user', JSON.stringify(userData));
    else localStorage.removeItem('grocerygo_user');

    if (jwt) localStorage.setItem('grocerygo_token', jwt);
    else localStorage.removeItem('grocerygo_token');
  };

  // Mock login: in a real app, replace with API call returning { user, token }
  const USERS_KEY = 'grocerygo_users';

  const getStoredUsers = () => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  };

  const setStoredUsers = (users) => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      // ignore
    }
  };

  

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const users = getStoredUsers();
      // find user by email
      const found = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
      if (!found) {
        throw new Error('User not found. Please sign up.');
      }
      if (found.password !== password) {
        throw new Error('Invalid credentials');
      }
      // create user object without password
      const { password: _pw, ...userData } = found;
      const role = userData.role || (userData.email && userData.email.includes('admin') ? 'admin' : 'user');
      const fakeToken = `mock-jwt-${btoa(userData.email + ':' + Date.now())}`;
      setAuth({ ...userData, role }, fakeToken);
      return { user: { ...userData, role }, token: fakeToken };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuth(null, null);
  };

  // Registration: save user credential in localStorage (mock)
  const register = async ({ name, email, password, role = 'user' }) => {
    setIsLoading(true);
    try {
      if (!email || !password) throw new Error('Email and password required');
      const users = getStoredUsers();
      const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) throw new Error('User with this email already exists');
      const newUser = {
        id: Date.now(),
        name: name || email.split('@')[0],
        email,
        password,
        role,
        addresses: [],
        orders: [],
        subscriptions: [],
        savedItems: [],
        phone: '',
      };
      users.push(newUser);
      setStoredUsers(users);
      const fakeToken = `mock-jwt-${btoa(email + ':' + Date.now())}`;
      const { password: _pw, ...userNoPw } = newUser;
      setAuth(userNoPw, fakeToken);
      return { user: userNoPw, token: fakeToken };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('grocerygo_user', JSON.stringify(updated));
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    register,
    updateUser,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
