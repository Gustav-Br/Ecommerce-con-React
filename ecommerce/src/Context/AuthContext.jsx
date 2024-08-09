import React, { useState } from 'react';
export const AuthContext = React.createContext();


const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(localStorage.getItem('login') || false);
    const handlerLogin = () => {
        setLogin(true);
        localStorage.setItem('login', true);
    };
    const handlerLogout = () => {
        setLogin(false);
        localStorage.removeItem('login', false);
    };

    return (
        <AuthContext.Provider
            value={{ login, handlerLogin, handlerLogout }} >
            {children}

        </AuthContext.Provider>
    );

};

export default AuthProvider;