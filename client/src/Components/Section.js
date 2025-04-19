
import { useEffect, useState } from "react";
import Cards from "./Cards";
import Card2 from "./Card2";
import axios from "axios";

function Section() {
    const [quest, setQuest] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("http://localhost:4000/api/quest", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setQuest(response.data.quest);
            } catch (err) {
                console.log(err);
                if (err.response && err.response.status === 404) {
                    setQuest(null);
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchQuest();
    }, []);
    

    return (
        <>
            <section className="min-h-screen py-10">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-10">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">

                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-indigo-500/10 p-4">
                            <h2 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                Quote of the Day
                            </h2>
                            <p className="mt-4 text-sm text-gray-400">
                                The path to strength begins with the first step of perseverance.
                            </p>
                        </div>

                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-purple-500/10 p-4">
                            <h3 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                Daily Quest Panel
                            </h3>

                            {loading ? (
                                <p className="text-sm text-gray-400 text-center mt-4">Loading...</p>
                            ) : error ? (
                                <p className="text-sm text-red-400 text-center mt-4">Something went wrong.</p>
                            ) : !quest ? (
                                <p className="text-sm text-gray-400 text-center mt-4">No quests</p>
                            ) : (
                                <Cards exercises={quest.exercises} />
                            )}
                        </div>

                        <div className="bg-[#1a1a2e] rounded-xl shadow-lg shadow-purple-500/10 p-4">
                            <h3 className="p-2 text-lg font-semibold text-center text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                                Total Progress
                            </h3>
                            {loading ? (
                                <p className="text-sm text-gray-400 text-center mt-4">Loading...</p>
                            ) : error ? (
                                <p className="text-sm text-red-400 text-center mt-4">Something went wrong.</p>
                            ) : !quest ? (
                                <p className="text-sm text-gray-400 text-center mt-4">No quests</p>
                            ) : (
                                <Card2 exercises={quest.exercises} />
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default Section;
