import { createContext } from 'react';

type AuthContextType = {
  authenticated: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);