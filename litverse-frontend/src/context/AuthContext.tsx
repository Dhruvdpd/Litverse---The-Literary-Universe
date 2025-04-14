// context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

type User = {
  username: string;
  email: string;
  // Add other fields if needed
};

const AuthContext = createContext<{ user: User | null; setUser: (user: User) => void }>({
  user: null,
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
