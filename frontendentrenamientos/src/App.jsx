import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register.JSX';
import EditorEntrenos from './components/EditorEntrenos';
import Api from './configApi/configApi';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.get(' http://localhost:5173/users/data');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  if (isLoggedIn) {
    return <EditorEntrenos onLogout={handleLogout} />;
  }

  return (
    <div>
      <Login onLoginSuccess={handleLoginSuccess} />
      <Register onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default App;