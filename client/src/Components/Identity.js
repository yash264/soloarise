import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Identity() {
    const { user, loading, setName, setEmail, updateUser,
        modal, setModal, isModalOpen
    } = useContext(UserContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg text-white">Loading...</div>
            </div>
        );
    }


    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid mt-14 grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                    <div className="flex mt-4 justify-center items-center">
                        <img
                            src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
                            className="w-24 h-24 items-center rounded-full"
                            alt="User Avatar"
                        />
                    </div>

                    <div className="bg-slate-800 rounded overflow-hidden" >

                        <div className="mx-auto max-w-prose text-center">
                            <h1 className="text-4xl font-bold text-white sm:text-5xl">
                                Welcome,
                                <strong className="text-indigo-600"> {user.name} </strong>
                            </h1>

                            <p className="mt-4 text-base text-white sm:text-lg/relaxed">
                                Here's a quick overview of your profile:
                            </p>

                            <div className="mt-6 text-left text-white space-y-2">
                                <p><span className="font-semibold">Username:</span> {user.username}</p>
                                <p><span className="font-semibold">Email:</span> {user.email}</p>
                                <p><span className="font-semibold">Level:</span> {user.level}</p>
                                <p><span className="font-semibold">Points:</span> {user.points}</p>
                            </div>

                            <div className="mt-8 flex justify-center gap-4">
                                <button
                                    className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                                    onClick={isModalOpen}
                                >
                                    Update
                                </button>
                            </div>
                        </div>


                        {
                            modal &&
                            <div
                                className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modalTitle"
                            >
                                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                                    <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">Update Profile</h2>

                                    <div className="mt-4 ">
                                        <div class="form-floating p-1">
                                            <input type="text" class="form-control" onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Your Name" />
                                            <label for="floatingPassword">Name</label>
                                        </div>
                                        <div class="form-floating p-1">
                                            <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter Your EmailId" />
                                            <label for="floatingInput">Email address</label>
                                        </div>
                                    </div>

                                    <footer className="mt-6 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                                            onClick={isModalOpen}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                            onClick={updateUser}
                                        >
                                            Update
                                        </button>
                                    </footer>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Identity;
