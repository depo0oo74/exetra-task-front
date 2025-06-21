import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from 'js-cookie';

type AuthProviderProps = {
    children: React.ReactNode;
};
  
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [access_Token, setAccessToken] = useState<string>('');
  
    const login = (accessToken: string) => {
        setAccessToken(accessToken);
         Cookies.set('access_Token', accessToken);
    };
  
    const logout = () => {
        setAccessToken('');
        Cookies.remove('access_Token');
    };
  
    return (
      <AuthContext.Provider value={{ access_Token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};