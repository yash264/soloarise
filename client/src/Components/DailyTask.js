import { useState } from "react";
import task from "../Assets/task.png";

function DailyTask() {
    const [isOpen, setIsOpen] = useState(false);

    const setModal = () => {
        if (isOpen === true) {
            setIsOpen(false);
        } else if (isOpen === false) {
            setIsOpen(true);
        }
    }

    return (
        <>
            {
                isOpen === true ?

                    <div
                        className="fixed inset-0 z-50 grid place-content-center bg-black/70 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modalTitle"
                    >
                        <div className="w-full max-w-md rounded-lg bg-[#1a1a2e] p-6 shadow-lg shadow-indigo-500/50">
                            <h2 id="modalTitle" className="text-xl font-bold text-cyan-300 sm:text-2xl drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                                Modal Title
                            </h2>

                            <div className="mt-4">
                                <p className="text-gray-300">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu
                                    consectetur. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>

                            <footer className="mt-6 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="rounded bg-[#1a1a2e] px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-[#2a2a3c] hover:text-cyan-300"
                                    onClick={setModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="rounded bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-600"
                                    onClick={setModal}
                                >
                                    Done
                                </button>
                            </footer>
                        </div>
                    </div>
                    :
                    <div className="fixed bottom-8 right-16">
                        <img
                            src={task}
                            alt="Task Icon"
                            className="w-24 h-24 rounded-full shadow-lg border-2 border-white bg-[#1a1a2e] transition duration-300 hover:scale-105 hover:shadow-cyan-400/60 hover:ring-2 hover:ring-cyan-400"
                            onClick={setModal}
                        />
                    </div>
            }
        </>
    )
}

export default DailyTask;
