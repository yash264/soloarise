import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function Identity() {
    const { user, loading } = useContext(UserContext);

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
                    <div className="flex mt-12 justify-center items-center">
                        <img
                            src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
                            className="w-24 h-24 items-center rounded-full"
                            alt="User Avatar"
                        />
                    </div>

                    <div>
                        <section className="bg-slate-800 lg:grid lg:place-content-center rounded-2xl">
                            <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
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
                                        <a
                                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                                            href="#"
                                        >
                                            Update
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Identity;
