import { createContext } from 'react';

type AuthContextType = {
  access_Token: string;
  login: (access_Token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);