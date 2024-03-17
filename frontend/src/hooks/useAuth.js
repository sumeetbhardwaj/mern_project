import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import storage from "../utils/storage";


const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = storage.getToken();

        setIsAuthenticated(!!token);
    }, []);

    const loginUser = (token) => {
        storage.setToken(token);

        setIsAuthenticated(true);
    };

    const AuthRedirect = ({ to }) => {
        return <Navigate to={to} />;
    };

    const logout = () => {
        storage.clearToken();

        setIsAuthenticated(false);
    };

    const ProtectedRoute = ({ component: Component, ...rest }) => {
        if (!isAuthenticated && !storage.getToken()) {
            return <AuthRedirect to={'/'} />;
        }

        return <Component {...rest} />;
    };

    return { isAuthenticated, loginUser, logout, ProtectedRoute };
};

export default useAuth;
