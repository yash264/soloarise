import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state


    // Function to fetch user data
    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const response = await fetch(`https://soloariseserver.onrender.com/api/user/getData`, {
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
    }, [user]);


    const updateUser = async () => {
        console.log(name, email);
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const response = await axios.post(`https://soloariseserver.onrender.com/api/user/update`,
                    {
                        name: name,
                        email: email,
                    },
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in headers
                        },
                    });

                if (response.ok) {
                    setUser(response.data); // Set user data
                    setModal(false);
                } else {
                    console.error("Failed to fetch user data:", response.data);
                    setModal(false);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setModal(false);
            }
        } else {
            setModal(false);
        }
        setLoading(false); // Stop loading
        setModal(false);
    };

    const isModalOpen = () => {
        if (modal === false) {
            setModal(true);
        }
        else if (modal === true) {
            setModal(false);
        }
    }

    return (
        <UserContext.Provider value={{
            user, setUser, loading, fetchUser, setName, setEmail,
            updateUser, isModalOpen, modal, setModal
        }}>
            {children}
        </UserContext.Provider>
    );
};