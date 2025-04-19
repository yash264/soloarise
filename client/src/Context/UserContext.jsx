import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user data
    const [loading, setLoading] = useState(true); // Track loading state

    // Function to fetch user data
    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const response = await fetch(`http://localhost:4000/api/user/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in headers
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUser(data.user); // Set user data
                } else {
                    console.error("Failed to fetch user data:", data.message);
                    setUser(null); // Clear user data on failure
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null); // Clear user data on error
            }
        } else {
            setUser(null); // Clear user data if no userId or token
        }

        setLoading(false); // Stop loading
    };

    // Fetch user data on app initialization
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};