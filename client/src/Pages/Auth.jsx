import React, { useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/UserContext'; 

export default function Auth() {
    const [login, setLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });

    const navigate = useNavigate(); // Initialize useNavigate
     const {fetchUser} = useContext(UserContext); 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!login && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const url = login
            ? 'https://soloariseserver.onrender.com/api/auth/login'
            : 'https://soloariseserver.onrender.com/api/auth/register';

        const payload = login
            ? { email: formData.email, password: formData.password }
            : {
                  name: formData.name,
                  email: formData.email,
                  password: formData.password,
                  username: formData.username,
              };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (!login) {
                    // Show success toast for registration
                    toast.success(data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    // Redirect to login form after successful signup
                    setLogin(true);
                } else {
                    // Store the token in localStorage
                    localStorage.setItem('token', data.token);

                    await fetchUser(); // Fetch user data after login
                    navigate('/hunter');
                }
            } else {
                if (login) {
                    // Show error toast for login failures
                    toast.error(data.message || 'Login failed. Please try again.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else {
                    // Show error toast for registration failures
                    toast.error(data.message || 'Something went wrong', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            if (login) {
                // Show error toast for login failures
                toast.error('An error occurred during login. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                // Show error toast for registration failures
                toast.error('An error occurred during registration. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    return (
        <div className="auth flex justify-center items-center min-h-screen w-full bg-gray-900 text-white px-4">
            <ToastContainer />
            <div className="auth-form w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => setLogin(true)}
                        className={`flex-1 py-2 text-center font-semibold rounded-l-lg ${
                            login ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setLogin(false)}
                        className={`flex-1 py-2 text-center font-semibold rounded-r-lg ${
                            !login ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {login ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}