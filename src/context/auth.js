import { createContext, useState } from 'react';

const AuthContext = createContext({});

function AuthProvider(props) {
  const [user, setUser] = useState({});

  function logout() {
    API.defaults.headers.common['Authorization'] = ``;
    setUser({});
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
