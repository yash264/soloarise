import { useState } from "react";
import SideBar from "./Sidebar";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

function LeaderBoard() {
    // Exercise list with completion state
    const ranking = [
        { name: "Lakshit", email: "abc@gmail.com", rank: 1 , points: 10 },
        { name: "Harish", email: "abc@gmail.com", rank: 2 , points: 10 },
        { name: "Harshit", email: "abc@gmail.com", rank: 3 , points: 10 },
        { name: "Yash", email: "abc@gmail.com", rank: 3 , points: 10 },
    ];

    const [rank, setRank] = useState(ranking);

    return (
        <>
            <section className=" min-h-screen py-10">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-10">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">

                        <SideBar />

                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-purple-500/10 p-4">
                            <h3 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                LeaderBoard
                            </h3>
                            <div className="grid w-100">
                                <div className="col-span-1 rounded-lg bg-gradient-to-r from-[#0f0f1a] via-[#141421] to-[#0f0f1a] p-6 shadow-lg text-white">
                                    {/* <h3 className="text-xl font-semibold text-center mb-4">Daily Exercises</h3> */}
                                    <div className="space-y-4">
                                        {rank.map((value, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span>{value.name}</span>
                                                <span>{value.email}</span>
                                                <span>{value.points}</span>
                                                <button
                                                    className={"flex items-center justify-center text-sm p-2 rounded-lg transition-colors bg-green-500"}
                                                >
                                                    {value.rank}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default LeaderBoard;
