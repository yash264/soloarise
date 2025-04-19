import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Check if the token exists
        if (token) {
            navigate('/hunter'); // Redirect to home page if authenticated
        }
    }, [navigate]);

    return <>{children}</>; // Render children if not authenticated
};

export default RedirectIfAuthenticated;