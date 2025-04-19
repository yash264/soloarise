import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../Assets/avatar.png";
import axios from "axios";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [level, setLevel] = useState(0);
    const [xp, setXp] = useState(0);
    const xpRequired = 1000;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/user/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const user = res.data;
                setLevel(user.points);
                setXp(user.level);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const Logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <>
            <header className="bg-gradient-to-r from-[#10101724] via-[#14142166] to-[#0f0f1a65] sticky top-0 w-full z-50 shadow-[0_10px_30px_rgba(0,0,0,0.9)]" style={{ position: "absolute" }}>
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block" href="#">
                        <a href="#" className="logo-text">SoloArise</a>
                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-8 text-sm font-semibold tracking-wide">
                                <li>
                                    <Link className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" to="../hunter" >Hunter</Link>
                                </li>
                                <li>
                                    <Link to="/hunter/ascension" className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" href="#">Level</Link>
                                </li>
                                {/* <li> */}
                                {/* <Link className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" to="../quests" >Daily Quest</Link> */}
                                {/* </li> */}
                                <li>
                                    <Link className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" to="../ranking" >Ranking</Link>
                                </li>
                                <li>
                                    <Link className="text-white transition duration-300 hover:text-cyan-400 hover:shadow-[0_0_12px_#22d3ee] hover:scale-105 p-2" to="../profile" >Profile</Link>
                                </li>

                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">


                            <div className="sm:flex sm:gap-4 items-center">
                                {/* XP Bar */}
                                <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden relative w-48">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                                        style={{ width: `${(xp / xpRequired) * 100}%` }} // Example: 65% XP filled
                                    ></div>
                                    <span className="absolute inset-0 flex justify-center text-xs text-white font-semibold">
                                        {xp} XP
                                    </span>
                                </div>
                                {/* Level Display */}
                                <div className="text-cyan-300 font-bold text-lg">
                                    Level: {level}
                                </div>

                            </div>
                            <div className="sm:flex sm:gap-4">
                                <button
                                    className="block rounded-sm bg-[#1f1f2e] p-2.5 text-rose-400 transition hover:text-cyan-400"
                                    onClick={Logout}
                                >
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
