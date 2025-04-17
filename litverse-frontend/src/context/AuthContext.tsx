// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  username: string;
  email: string;
  token: string; // ✅ Add token field
};

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Store user in localStorage when updated
  const handleSetUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
