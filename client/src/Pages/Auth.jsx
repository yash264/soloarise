import React from 'react';

export default function Auth() {
    const [login, setLogin] = React.useState(true);

    return (
        <div className="auth flex justify-center items-center min-h-screen w-full bg-gray-900 text-white px-4">
            <div className="auth-form w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg ">
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => setLogin(true)}
                        className={`flex-1 py-2 text-center font-semibold rounded-l-lg ${login ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setLogin(false)}
                        className={`flex-1 py-2 text-center font-semibold rounded-r-lg ${!login ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        Register
                    </button>
                </div>

                {login ? (
                    <form>
                        <div className="text-center mb-4">
                            <p>Sign in with:</p>
                            {/* <div className="flex justify-center gap-3 text-lg mt-2">
                                <i className="fab fa-facebook-f cursor-pointer hover:text-blue-500"></i>
                                <i className="fab fa-google cursor-pointer hover:text-red-500"></i>
                                <i className="fab fa-twitter cursor-pointer hover:text-blue-400"></i>
                                <i className="fab fa-github cursor-pointer hover:text-gray-400"></i>
                            </div> */}
                        </div>

                        {/* <p className="text-center mb-4">or:</p> */}

                        <div className="mb-4">
                            <label htmlFor="loginName" className="block mb-1">Email</label>
                            <input type="email" id="loginName" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="loginPassword" className="block mb-1">Password</label>
                            <input type="password" id="loginPassword" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div className="flex justify-end mb-4">
                            <a href="#!" className="text-sm text-indigo-400 hover:underline">Forgot password?</a>
                        </div>

                        <div className="flex justify-center">
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold">Sign in</button>
                        </div>
                    </form>
                ) : (
                    <form>
                        <div className="text-center mb-4 h-100">
                            {/* <p>Sign up with:</p>
                            <div className="flex justify-center gap-3 text-lg mt-2">
                                <i className="fab fa-facebook-f cursor-pointer hover:text-blue-500"></i>
                                <i className="fab fa-google cursor-pointer hover:text-red-500"></i>
                                <i className="fab fa-twitter cursor-pointer hover:text-blue-400"></i>
                                <i className="fab fa-github cursor-pointer hover:text-gray-400"></i>
                            </div> */}
                        </div>

                        {/* <p className="text-center mb-4">or:</p> */}

                        <div className="mb-4">
                            <label htmlFor="registerName" className="block mb-1">Name</label>
                            <input type="text" id="registerName" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="registerEmail" className="block mb-1">Email</label>
                            <input type="email" id="registerEmail" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="registerPassword" className="block mb-1">Password</label>
                            <input type="password" id="registerPassword" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="registerRepeatPassword" className="block mb-1">Confirm Password</label>
                            <input type="password" id="registerRepeatPassword" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div className="flex justify-center">
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold">Sign up</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
