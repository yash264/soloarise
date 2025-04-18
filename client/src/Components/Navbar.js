import { useState } from "react";
import fitness from "../Assets/fitness.png";
import avatar from "../Assets/avatar.png";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-gradient-to-r from-[#0f0f1a] via-[#141421] to-[#0f0f1a] fixed top-0 w-full z-50 shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block" href="#">
                        <a href="#" className="logo-text">SoloArise</a>
                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-8 text-sm font-semibold tracking-wide">
                                <li>
                                    <a className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" href="#">DashBoard</a>
                                </li>
                                <li>
                                    <a className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" href="#">WorkOut</a>
                                </li>
                                <li>
                                    <a className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" href="#">LeaderBoard</a>
                                </li>
                                <li>
                                    <a className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" href="#">Profile</a>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/60 transition duration-300"
                                />
                            </div>

                            <button
                                className="block rounded-sm bg-[#1f1f2e] p-2.5 text-gray-300 transition hover:text-cyan-400 md:hidden"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <span className="sr-only">Toggle menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
