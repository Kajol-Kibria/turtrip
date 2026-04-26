'use client';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [onSuccessAction, setOnSuccessAction] = useState(null);

  const login = (method) => {
    // Simulating a successful login
    console.log(`Logging in via ${method}...`);
    setTimeout(() => {
      setUser({
        id: 'u1',
        name: 'Oluwapelumi Yusuf',
        email: 'oluwapelumiyusuf@gmail.com',
        role: 'Traveler',
        country: 'Nigeria',
        profilePhoto: 'https://picsum.photos/seed/user1/100/100',
      });
      setIsAuthModalOpen(false);
      if (onSuccessAction) {
        onSuccessAction();
        setOnSuccessAction(null);
      }
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = (onSuccess) => {
    if (onSuccess) setOnSuccessAction(() => onSuccess);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setOnSuccessAction(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        login,
        logout,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
