// src/auth/authUtils.ts
import jwtDecode from 'jwt-decode'; // npm install jwt-decode

export const setToken = (token: string) => {
  localStorage.setItem('cryptoAppToken', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('cryptoAppToken');
};

export const removeToken = () => {
  localStorage.removeItem('cryptoAppToken');
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
};

export const logout = () => {
  removeToken();
  window.location.href = '/login'; // force redirect
};