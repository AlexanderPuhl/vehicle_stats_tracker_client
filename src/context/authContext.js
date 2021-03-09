import { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import useAuthentication from '../hooks/useAuthentication';
import { loadAuthToken } from '../utilities/local-storage';

const authToken = loadAuthToken();
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { submitAuthRefresh } = useAuthentication();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(null);

  const getUser = async () => {
    if (authToken) {
      const refreshedToken = await submitAuthRefresh(authToken);
      if (refreshedToken) {
        const decodedToken = jwtDecode(refreshedToken);
        setUser(decodedToken);
        setAuthenticated(true);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={[isAuthenticated, setAuthenticated, user, setUser]}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticated = () => {
  const [isAuthenticated, setAuthenticated] = useContext(AuthContext);
  const [user, setUser] = useContext(AuthContext);

  return { isAuthenticated, setAuthenticated, user, setUser };
};
