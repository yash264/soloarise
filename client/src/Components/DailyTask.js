import { useState } from "react";
import task from "../Assets/task.png";

function DailyTask() {
    const exercises = ["Push-ups", "Squats", "Plank", "Jumping Jacks", "Lunges"];
    const [isOpen, setIsOpen] = useState(false);
    const [currentExercise, setCurrentExercise] = useState("");

    const setModal = (exercise = "") => {
        setCurrentExercise(exercise);
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 grid place-content-center bg-black/70 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <div className="w-full max-w-md rounded-lg bg-[#1a1a2e] p-6 shadow-lg shadow-indigo-500/50">
                        {/* <h2
                            id="modalTitle"
                            className="text-xl font-bold text-cyan-300 sm:text-2xl drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                        >
                            {currentExercise}
                        </h2> */}

                        <div className=" bg-[#1a1a2e] p-6 rounded-xl shadow-xl border border-cyan-500 text-white w-80 space-y-4">
                            <h2 className="text-center text-cyan-300 font-bold text-lg">
                                Daily Exercise Quests
                            </h2>
                            <ul className="">
                                {exercises.map((exercise, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center bg-[#2a2a3c] p-3 rounded-md shadow hover:shadow-cyan-400/40 transition"
                                    >
                                        <span>{exercise}</span>
                                        <button
                                            // record
                                            className="text-sm bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded"
                                        >
                                            Start
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <footer className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                className="rounded bg-[#1a1a2e] px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-[#2a2a3c] hover:text-cyan-300"
                                onClick={() => setModal("")}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="rounded bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-cyan-400 hover:to-blue-600"
                                onClick={() => setModal("")}
                            >
                                Done
                            </button>
                        </footer>
                    </div>
                </div>
            )}

            <div className="fixed bottom-8 right-16">
                <img
                    src={task}
                    alt="Task Icon"
                    className="w-24 h-24 rounded-full shadow-lg border-2 border-white bg-[#1a1a2e] transition duration-300 hover:scale-105 hover:shadow-cyan-400/60 hover:ring-2 hover:ring-cyan-400"
                    onClick={() => setModal("Daily Exercises")}
                />
            </div>

           
        </>
    );
}

export default DailyTask;
