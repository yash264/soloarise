import React, { useEffect, useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "./Navbar";
import axios from "axios";

const levels = Array.from({ length: 101 }, (_, i) => i);

const getGlowColor = (level, currentLevel) => {
    if (level === currentLevel) {
        return "from-cyan-400 to-cyan-600 ring-cyan-300 glow-cyan"; // Intense glow for current level
    }
    if (level < currentLevel) {
        return "from-green-400 to-lime-500 ring-green-300 glow-green"; // Completed levels
    }
    return "from-red-500 to-red-700 ring-red-300 glow-red";  // Locked levels
};


const LevelTree = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const levelRefs = useRef([]);

    // Scroll to the current level on mount
    useEffect(() => {
        if (levelRefs.current[currentLevel]) {
            levelRefs.current[currentLevel].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [currentLevel]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get("https://soloariseserver.onrender.com/api/user/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const user = res.data;
                setCurrentLevel(user.level);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [currentLevel]);


    return (
        <>
        <Navbar />
        <div
            className="relative flex flex-col items-center py-10 px-4"
            style={{
                background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0,0,0,0.8), rgba(0,0,255,0.6), rgba(255,0,0,0.6))", // Blue, Red, Black gradient
            }}
        >
            {levels.map((level, index) => {
                const glowColor = getGlowColor(level, currentLevel);

                return (
                    <div
                        key={level}
                        ref={(el) => (levelRefs.current[level] = el)} // Store references for each level
                        className={`relative flex items-center justify-${index % 2 === 0 ? "start" : "end"} w-full max-w-md my-6`}
                    >
                        {/* Connecting line */}
                        {index !== levels.length - 1 && (
                            <div
                                className="absolute top-full left-1/2 h-12 w-1 bg-gradient-to-b from-cyan-400 to-blue-600"
                                style={{ transform: "translateX(-50%)" }}
                            ></div>
                        )}

                        <div
                            className={`relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${glowColor} text-white text-xl font-bold shadow-lg ring-2 animate-glow-${level}`}
                        >
                            {level}
                        </div>
                    </div>
                );
            })}

            <style>{`
        @keyframes glow-cyan {
          0% { box-shadow: 0 0 20px rgba(0,255,255,0.5); }
          50% { box-shadow: 0 0 30px rgba(0,255,255,1), 0 0 40px rgba(0,255,255,0.8); }
          100% { box-shadow: 0 0 20px rgba(0,255,255,0.5); }
        }

        @keyframes glow-green {
          0% { box-shadow: 0 0 10px rgba(0,255,0,0.2); }
          50% { box-shadow: 0 0 20px rgba(0,255,0,0.8), 0 0 30px rgba(128,255,0,0.6); }
          100% { box-shadow: 0 0 10px rgba(0,255,0,0.2); }
        }

        @keyframes glow-gray {
          0% { box-shadow: 0 0 5px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
          100% { box-shadow: 0 0 5px rgba(255,255,255,0.1); }
        }

        .glow-cyan { animation: glow-cyan 2s infinite; }
        .glow-green { animation: glow-green 2s infinite; }
        .glow-gray { animation: glow-gray 2s infinite; }
      `}</style>
        </div>
        </>
    );
};

export default LevelTree;
