import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { API_BASE_URL } from '../config';
import { saveAuthToken, clearAuthToken } from '../utilities/local-storage';

export default function useAuthentication() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitLogin(values) {
    setLoading(true);
    setError(false);

    return await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then(({ authToken }) => {
        saveAuthToken(authToken);
        let decodedToken = jwtDecode(authToken);
        return decodedToken;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function submitRegistration(values) {
    setLoading(true);
    setError(false);

    await fetch(`${API_BASE_URL}/user/create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });

    return await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then(({ authToken }) => {
        saveAuthToken(authToken);
        let decodedToken = jwtDecode(authToken);
        return decodedToken;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function submitAuthRefresh(authToken) {
    return await fetch(`${API_BASE_URL}/user/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ authToken }) => {
        saveAuthToken(authToken);
        return authToken;
      })
      .catch((error) => {
        setError(error);
        clearAuthToken();
      });
  }

  return {
    error,
    loading,
    submitLogin,
    submitRegistration,
    submitAuthRefresh,
  };
}
