import React, { useState } from 'react';
export const AuthContext = React.createContext();


const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(localStorage.getItem('login') || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {}); //recuperar 'user' de locaStorage, pasarlo a objeto

    const handlerLogin = (userData) => {
        setLogin(true);
        localStorage.setItem('login', true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));  //localStorage solo almacena string, debo pasar (userData) a string
    };
    const handlerLogout = () => {
        setLogin(false);
        localStorage.removeItem('login');
        setUser();
        localStorage.removeItem('user',);
    };

    return (
        <AuthContext.Provider
            value={{ login, user, handlerLogin, handlerLogout }} >
            {children}

        </AuthContext.Provider>
    );

};

export default AuthProvider;