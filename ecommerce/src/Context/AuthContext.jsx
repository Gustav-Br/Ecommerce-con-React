import React, { useState } from 'react';
export const AuthContext = React.createContext();


const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(localStorage.getItem('login') || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {}); //recuperar 'user' de locaStorage, pasarlo a objeto

    const handleLogin = (userData) => {
        setLogin(true);
        localStorage.setItem('login', true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));  //localStorage solo almacena string, debo pasar (userData) a string
    };
    const handleLogout = () => {
        setLogin(false);
        localStorage.removeItem('login');
        setUser();
        localStorage.removeItem('user',);
    };

    return (
        <AuthContext.Provider
            value={{ login, user, handleLogin, handleLogout }} >
            {children}

        </AuthContext.Provider>
    );

};

export default AuthProvider;