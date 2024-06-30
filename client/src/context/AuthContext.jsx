import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const exsitsUser = JSON.parse(localStorage.getItem('user'));
  const [authUser, setAuthUser] = useState(exsitsUser || null);
  return <AuthContext.Provider value={{ authUser, setAuthUser }}>
    { children }
  </AuthContext.Provider>
}