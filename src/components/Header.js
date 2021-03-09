import React from 'react';
import { clearAuthToken } from '../utilities/local-storage';
import { useAuthenticated } from '../context/authContext';

export default function Header() {
  const { setAuthenticated, setUser } = useAuthenticated();

  function logout() {
    clearAuthToken();
    setAuthenticated(false);
    setUser(null);
  }

  return (
    <header>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
