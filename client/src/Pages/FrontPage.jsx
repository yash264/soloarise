import React from 'react';
import { Link } from 'react-router-dom';

export default function FrontPage() {
    return (
        <div>
            <nav className="navbar flex justify-between items-center px-6 py-4">
                <a href="#" className="logo-text">SoloArise</a>
            </nav>

            <div className="hero-section flex items-center min-h-screen bg-gray-800 text-white px-8">
                <div className="text-left hero-text">
                    <h1 className="text-3xl font-extrabold mb-4">
                        Welcome to <span className="solo-text">SoloArise</span>
                    </h1>
                    <p className="text-xl mb-6">Game on a whole new level</p>
                    <Link
                        to="/dungeon"
                        className="solo-btn"
                    >
                        Enter the Dungeon
                    </Link>
                </div>
            </div>
        </div>
    );
}
