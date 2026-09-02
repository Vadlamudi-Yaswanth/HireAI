import {createContext,useState} from 'react';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });
  const login = (userData, userToken) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
    setUser(userData);
    setToken(userToken);
  };
  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;