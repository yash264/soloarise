import { useState } from "react";
import fitness from "../Assets/fitness.png";
import avatar from "../Assets/avatar.png";

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-neutral-700 fixed top-0 w-full z-50 shadow-4xl">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block text-teal-600" href="#">
                        <img src={fitness} className="w-24" />
                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <a className="text-white transition hover:text-yellow-400" href="#"> DashBoard </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-yellow-400" href="#"> WorkOut </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-yellow-400" href="#"> LeaderBoard </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-yellow-400" href="#"> Profile </a>
                                </li>

                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <img
                                    src={avatar}
                                    alt="Logo"
                                    className="w-12 h-12 rounded-full shadow-lg border-2 border-white bg-white"
                                />
                            </div>

                            <button
                                className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
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
    )
}

export default Navbar;